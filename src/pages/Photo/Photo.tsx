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

    const [photoCols, setPhotoCols] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 1);
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
            setLoading(true);
            try {
                const response = await axios.get(`${BASEURL}/api/picture/search/${location.search}`);
                setPhotos(response.data.value.content);
                console.log(response.data.value.content);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, [location.search]);

    const resizeHandler = () => {
        setPhotoCols(window.innerWidth > Number(boundaryWidth) ? 4 : 1);
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
            <StyledPhotoHeader>
                <Filters_Test setGetFilter={setSelectedPlace} data={PhotoFilter_Place} />
                <Filters_Test setGetFilter={setSelectedOrder} data={PhotoFilter_Order} />
            </StyledPhotoHeader>

            <div style={{ display: 'flex' }}>
                {filterValue.sort && (
                    <StyledSelected>
                        {filterValue.sort}
                        <FaTimes onClick={() => handleFilterValue('', 'sort')} />
                    </StyledSelected>
                )}
                {filterValue.homePlace && (
                    <StyledSelected>
                        {filterValue.homePlace}
                        <FaTimes onClick={() => handleFilterValue('', 'homePlace')} />
                    </StyledSelected>
                )}
                {(filterValue.homePlace || filterValue.sort) && (
                    <StyledSelected onClick={onReset}>초기화</StyledSelected>
                )}
            </div>

            <ItemList
                width="100%"
                imgHeight="150%"
                cols={photoCols}
                horizontalGap={photoHorizontalGap}
                verticalGap={photoVerticalGap}
                items={photos}
                RenderComponent={PhotoItem}
            />
        </StyledPhotoContainer>
    );
};

const StyledPhotoContainer = styled.div<{ pageAnim: any }>`
    height: 500px;
    animation: ${({ pageAnim }) => pageAnim} 1s;
    animation-fill-mode: forwards;
`;

const StyledPhotoHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-top: -20px;
`;

const StyledSelected = styled.div`
    background: gray;
    color: white;
    margin-right: 5px;
    margin-top: 5px;
    padding: 5px;
    font-size: 14px;
    border-radius: 4px;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 1.5vw;
    }
`;

export default Photo;
