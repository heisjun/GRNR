import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Filters_Test, ItemList, PhotoItem } from 'common/components';
import { FadeIn, FadeOut } from 'common/keyframes';
import axios from 'axios';
import { IPhotosParams } from 'common/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import PhotoBanner from 'common/components/PhotoBanner';
import { useInView } from 'react-intersection-observer';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const maxWidth = process.env.REACT_APP_MAX_WIDTH;

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
        name: '공간 (필수)',
        list: ['원룸', '거실', '침실', '주방', '욕실', '베란다', '사무실', '가게', '야외정원'],
    },
];

const PhotoFilter_Classification = [
    {
        id: 3,
        name: '분류',
        list: ['잎보기식물', '꽃보기식물', '열매보기식물', '선인장,다육식물'],
    },
];

const PhotoFilter_Video = [
    {
        id: 4,
        name: '동영상',
        list: ['동영상', '사진'],
    },
];

const Photo: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [observerRef, observerInview] = useInView();
    const [size, setSize] = useState<number>(9);
    const [photos, setPhotos] = useState<IPhotosParams[]>([]);
    const [photoCols, setPhotoCols] = useState(window.innerWidth > Number(boundaryWidth) ? 3 : 1);
    const [photoHorizontalGap, setPhotoHorizontalGap] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 0);
    const [photoVerticalGap, setPhotoVerticalGap] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 4);
    const [pageAnim, setPageAnim] = useState<any>(FadeIn);
    const [selectedPlace, setSelectedPlace] = useState('');
    const [selectedOrder, setSelectedOrder] = useState('');
    const [selectedClassification, setSelectedClassification] = useState('');
    const [selectedVideo, setSelectedVideo] = useState('');

    const [filterValue, setFilterValue] = useState({
        sort: '',
        homePlace: '',
        classification: '',
        video: '',
    });
    const handleFilterValue = (value: string, name: string) => {
        setFilterValue((prev) => {
            return { ...prev, [name]: value };
        });
    };

    useEffect(() => {
        handleFilterValue(selectedPlace, 'homePlace');
    }, [selectedPlace]);

    useEffect(() => {
        handleFilterValue(selectedOrder, 'sort');
    }, [selectedOrder]);

    useEffect(() => {
        handleFilterValue(selectedClassification, 'classification');
    }, [selectedClassification]);

    useEffect(() => {
        handleFilterValue(selectedVideo, 'video');
    }, [selectedVideo]);

    const onReset = () => {
        setFilterValue({
            sort: '',
            homePlace: '',
            classification: '',
            video: '',
        });
    };

    const fetchData = async () => {
        if (!TOKEN) {
            try {
                const response = await axios.get(`${BASEURL}/api/picture/search${location.search}`, {
                    params: {
                        page: 0,
                        size: size,
                    },
                });
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
                    params: {
                        page: 0,
                        size: size,
                    },
                });
                setPhotos(response.data.value.content);
            } catch (e) {
                console.log(e);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [location.search]);

    useEffect(() => {
        if (observerInview) {
            setSize((prev) => prev + 9);
            fetchData();
        }
    }, [observerInview]);

    useEffect(() => {
        const queryString = `?${filterValue.sort ? `order=${filterValue.sort}` : ''} & 
    ${filterValue.homePlace ? `homePlace=${filterValue.homePlace}` : ''}& 
    ${filterValue.classification ? `classification=${filterValue.classification}` : ''} & 
    ${filterValue.video ? `video=${filterValue.video}` : ''}`;

        const realQuery = queryString.replace(/\s+/g, '');

        navigate(`/community/photo/${realQuery}`);
    }, [filterValue.homePlace, filterValue.sort, filterValue.classification, filterValue.video]);

    const [popular1, setPopular1] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASEURL}/api/picture/search?order=인기순`);
                setPopular1(response.data.value.content);
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setPageAnim(FadeIn);
        return () => {
            setPageAnim(FadeOut);
        };
    }, []);

    return (
        <StyledPhotoContainer pageAnim={pageAnim}>
            <div style={{ width: 1140, margin: 'auto' }}>
                <PhotoBanner data={popular1} />
                <StyledBorderLine />
                <StyledPhotoHeader>
                    <Filters_Test setGetFilter={setSelectedOrder} data={PhotoFilter_Order} />
                    <Filters_Test setGetFilter={setSelectedPlace} data={PhotoFilter_Place} />
                    <Filters_Test setGetFilter={setSelectedClassification} data={PhotoFilter_Classification} />
                    <Filters_Test setGetFilter={setSelectedVideo} data={PhotoFilter_Video} />
                </StyledPhotoHeader>

                <div style={{ display: 'flex', paddingBottom: 20 }}>
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
                                <FaTimes
                                    onClick={() => handleFilterValue('', 'homePlace')}
                                    style={{ paddingLeft: 3 }}
                                />
                            </div>
                        </StyledSelected>
                    )}
                    {filterValue.classification && (
                        <StyledSelected>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {filterValue.classification}
                                <FaTimes
                                    onClick={() => handleFilterValue('', 'classification')}
                                    style={{ paddingLeft: 3 }}
                                />
                            </div>
                        </StyledSelected>
                    )}
                    {filterValue.video && (
                        <StyledSelected>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {filterValue.video}
                                <FaTimes onClick={() => handleFilterValue('', 'video')} style={{ paddingLeft: 3 }} />
                            </div>
                        </StyledSelected>
                    )}
                    {(filterValue.homePlace || filterValue.sort) && (
                        <StyledSelected onClick={onReset}>초기화</StyledSelected>
                    )}
                </div>
                {photos ? (
                    <>
                        <ItemList
                            width="100%"
                            imgHeight="120%"
                            cols={photoCols}
                            horizontalGap={photoHorizontalGap}
                            verticalGap={photoVerticalGap}
                            items={photos}
                            RenderComponent={PhotoItem}
                            setFunc={setPhotos}
                        />
                        <div ref={observerRef} />
                    </>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', height: 400, alignItems: 'center' }}>
                        <div style={{ fontSize: 18, fontWeight: 400 }}>찾으시는 결과가 없습니다!</div>
                    </div>
                )}
            </div>
        </StyledPhotoContainer>
    );
};

const StyledPhotoContainer = styled.div<{ pageAnim: any }>`
    padding-top: 40px;
    /*  @media screen and (max-width: ${maxWidth}px) {
        padding-left: 20%;
        padding-right: 20%;
    }
    @media screen and (min-width: ${maxWidth}px) {
        margin-left: 390px;
        margin-right: 390px;
    } */
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: ${({ pageAnim }) => pageAnim} 1s;
    animation-fill-mode: forwards;
    margin-bottom: 120px;
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
