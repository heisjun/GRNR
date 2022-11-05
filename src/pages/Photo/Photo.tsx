import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Filters_Test, ItemList, PhotoItem } from 'common/components';
import { FadeIn, FadeOut } from 'common/keyframes';
import axios from 'axios';
import { IPhotosParams } from 'common/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');
const PhotoFilter_Order = [
    {
        id: 1,
        name: '정렬',
        list: ['최신순', '인기순'],
    },
];

const PhotoFilter_Place = [
    {
        id: 2,
        name: '공간',
        list: ['원룸', '거실', '침실', '주방', '욕실', '베란다', '사무실', '가게', '야외정원'],
    },
];

const Photo: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [photos, setPhotos] = useState<IPhotosParams[]>([]);
    const [loading, setLoading] = useState(false);

    const [photoCols, setPhotoCols] = useState(window.innerWidth > Number(boundaryWidth) ? 3 : 1);
    const [photoHorizontalGap, setPhotoHorizontalGap] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 0);
    const [photoVerticalGap, setPhotoVerticalGap] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 4);
    const [pageAnim, setPageAnim] = useState<any>(FadeIn);
    const [selectedPlace, setSelectedPlace] = useState('');
    const [selectedOrder, setSelectedOrder] = useState('');

    const [filterValue, setFilterValue] = useState({
        sort: '',
        homePlace: '',
    });
    const handleFilterValue = (value: string, name: string) => {
        setFilterValue((prev) => {
            return { ...prev, [name]: value };
        });
    };

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    useEffect(() => {
        handleFilterValue(selectedPlace, 'homePlace');
    }, [selectedPlace]);

    useEffect(() => {
        handleFilterValue(selectedOrder, 'sort');
    }, [selectedOrder]);

    useEffect(() => {
        const queryString = `?${filterValue.sort ? `order=${filterValue.sort}` : ''} & 
    ${filterValue.homePlace ? `homePlace=${filterValue.homePlace}` : ''}`;

        const realQuery = queryString.replace(/\s+/g, '');

        navigate(`/community/photo/${realQuery}`);
    }, [filterValue.homePlace, filterValue.sort]);

    const onReset = () => {
        setFilterValue({
            sort: '',
            homePlace: '',
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!TOKEN) {
                try {
                    const response = await axios.get(`${BASEURL}/api/picture/search${location.search}`);
                    setPhotos(response.data.value.content);
                } catch (e) {
                    console.log(e);
                }
            } else {
                try {
                    const response = await axios.get(`${BASEURL}/api/picture/search${location.search}`, {
                        headers: {
                            Authorization: `Bearer ${TOKEN}`,
                        },
                    });
                    setPhotos(response.data.value.content);
                } catch (e) {
                    console.log(e);
                }
            }
        };
        fetchData();
    }, [location.search]);

    const resizeHandler = () => {
        setPhotoCols(window.innerWidth > Number(boundaryWidth) ? 3 : 1);
        setPhotoHorizontalGap(window.innerWidth > Number(boundaryWidth) ? 2 : 0);
        setPhotoVerticalGap(window.innerWidth > Number(boundaryWidth) ? 4 : 4);
    };

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    useEffect(() => {
        setPageAnim(FadeIn);
        return () => {
            setPageAnim(FadeOut);
        };
    }, []);

    return (
        <StyledPhotoContainer pageAnim={pageAnim}>
            <div style={{ width: '100%', height: 500, display: 'flex' }}>
                <div
                    style={{
                        width: '65%',
                        backgroundColor: 'gray',
                        marginRight: '2%',
                        backgroundImage: 'url(/sample.jpeg)',
                        backgroundSize: 'cover',
                    }}
                ></div>
                <div
                    style={{ width: '33%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                    <div
                        style={{
                            width: '100%',
                            height: '48%',
                            backgroundColor: 'gray',
                            backgroundImage: 'url(/sample2.jpg)',
                            backgroundSize: 'cover',
                        }}
                    ></div>
                    <div
                        style={{
                            width: '100%',
                            height: '48%',
                            backgroundColor: 'gray',
                            backgroundImage: 'url(/sample2.jpg)',
                            backgroundSize: 'cover',
                        }}
                    ></div>
                </div>
            </div>
            <StyledBorderLine />
            <StyledPhotoHeader>
                <Filters_Test setGetFilter={setSelectedPlace} data={PhotoFilter_Place} />
                <Filters_Test setGetFilter={setSelectedOrder} data={PhotoFilter_Order} />
            </StyledPhotoHeader>

            <div style={{ display: 'flex' }}>
                {filterValue.sort && (
                    <StyledSelected>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {filterValue.sort}
                            <FaTimes onClick={() => handleFilterValue('', 'sort')} style={{ paddingLeft: 3 }} />
                        </div>
                    </StyledSelected>
                )}
                {filterValue.homePlace && (
                    <StyledSelected>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {filterValue.homePlace}
                            <FaTimes onClick={() => handleFilterValue('', 'homePlace')} style={{ paddingLeft: 3 }} />
                        </div>
                    </StyledSelected>
                )}
                {(filterValue.homePlace || filterValue.sort) && (
                    <StyledSelected onClick={onReset}>초기화</StyledSelected>
                )}
            </div>

            {photos ? (
                <ItemList
                    width="100%"
                    imgHeight="120%"
                    cols={photoCols}
                    horizontalGap={photoHorizontalGap}
                    verticalGap={photoVerticalGap}
                    items={photos}
                    RenderComponent={PhotoItem}
                />
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', height: 400, alignItems: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 400 }}>찾으시는 결과가 없습니다!</div>
                </div>
            )}
        </StyledPhotoContainer>
    );
};

const StyledPhotoContainer = styled.div<{ pageAnim: any }>`
    padding-left: 20%;
    padding-right: 20%;
    animation: ${({ pageAnim }) => pageAnim} 1s;
    animation-fill-mode: forwards;
`;

const StyledPhotoHeader = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const StyledSelected = styled.div`
    background: gray;
    color: white;
    margin-right: 5px;
    margin-top: 7px;
    padding: 7px 7px 7px 7px;
    font-size: 14px;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 1.5vw;
    }
    cursor: pointer;
`;

const StyledBorderLine = styled.div`
    width: 100%;
    border-bottom: solid 1px;
    border-color: #eaeaea;
    margin: 40px 0px 40px 0px;
`;

export default Photo;
