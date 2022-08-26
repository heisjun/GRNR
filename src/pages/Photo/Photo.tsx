import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Filters, ItemList, PhotoItem } from 'common/components';
import { FadeIn, FadeOut } from 'common/keyframes';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const Photo: React.FC = () => {
    const [photoCols, setPhotoCols] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 1);
    const [photoHorizontalGap, setPhotoHorizontalGap] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 0);
    const [photoVerticalGap, setPhotoVerticalGap] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 4);

    const [pageAnim, setPageAnim] = useState<any>(FadeIn);

    const [selected, setSelected] = useState('');

    const data = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

    const DictionaryFilter = [
        {
            id: 1,
            name: '분류',
            list: ['입보기식물', '꽃보기식물', '열매보기식물', '선인장&다육식물'],
        },
        {
            id: 2,
            name: '광도',
            list: ['낮음', '중간', '높음'],
        },
        {
            id: 3,
            name: '습도',
            list: ['40%미만', '40~70%', '70%이상'],
        },
        {
            id: 4,
            name: '온도',
            list: ['10~15°C', '16~20°C', '21~25°C', '26~30°C'],
        },
        {
            id: 5,
            name: '관리레벨',
            list: ['초보자', '경험자', '전문가'],
        },
        {
            id: 6,
            name: '잎의무늬',
            list: ['줄무늬', '점무늬', '잎 가장자리 무늬', '기타'],
        },
        {
            id: 7,
            name: '장소',
            list: ['실내 어두운 곳', '거실 내측', '거실 창측', '발코니'],
        },
    ];

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
                <Filters setGetFilter={setSelected} data={DictionaryFilter} />
            </StyledPhotoHeader>
            <ItemList
                width="100%"
                imgHeight="150%"
                cols={photoCols}
                horizontalGap={photoHorizontalGap}
                verticalGap={photoVerticalGap}
                items={data}
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
    padding-bottom: 15px;
`;

export default Photo;
