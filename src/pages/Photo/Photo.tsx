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

    const PhotoFilter = [
        {
            id: 1,
            name: '정렬',
            list: ['인기순', '최신순'],
        },
        {
            id: 2,
            name: '공간',
            list: ['원룸', '거실', '침실', '주방', '욕실', '베란다', '사무실', '가게', '야외정원'],
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
                <Filters setGetFilter={setSelected} data={PhotoFilter} />
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
