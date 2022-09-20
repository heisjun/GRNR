import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Filters, ItemList, MagazineItem } from 'common/components';
import { FadeIn, FadeOut } from 'common/keyframes';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const Magazine: React.FC = () => {
    const [magazineCols, setMagazineCols] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 1);
    const [magazineGap, setMagazineGap] = useState(window.innerWidth > Number(boundaryWidth) ? 2 : 6);

    const [pageAnim, setPageAnim] = useState<any>(FadeIn);

    const [selected, setSelected] = useState('');

    const mgzData = [{}, {}, {}, {}, {}, {}, {}, {}];

    const MagazineFilter = [
        {
            id: 1,
            name: '지역',
            list: ['공개', '비공개'],
        },
        {
            id: 2,
            name: '정원 경력',
            list: ['1년 차', '2년 차', '3년 차', '4년 차', '5년 차'],
        },
        {
            id: 3,
            name: '공간',
            list: ['원룸', '거실', '침실', '주방', '욕실', '베란다', '사무실', '가게', '야외정원'],
        },
        {
            id: 4,
            name: '방향',
            list: ['동향', '서향', '남향', '북향', '남서향', '남동향', '북서향', '북동향'],
        },
        {
            id: 5,
            name: '반려동물 유무',
            list: ['강아지', '고양이', '어류', '조류', '파충류', '기타'],
        },
        {
            id: 6,
            name: '주제',
            list: ['가드닝 팁', '제품 리뷰'],
        },
    ];

    const resizeHandler = () => {
        setMagazineCols(window.innerWidth > Number(boundaryWidth) ? 2 : 1);
        setMagazineGap(window.innerWidth > Number(boundaryWidth) ? 2 : 6);
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
        <StyledMagazineContainer pageAnim={pageAnim}>
            <StyledMagazineHeader>
                <Filters setGetFilter={setSelected} data={MagazineFilter} />
            </StyledMagazineHeader>
            <ItemList
                width="100%"
                imgHeight="70%"
                cols={magazineCols}
                horizontalGap={magazineGap}
                verticalGap={magazineGap}
                items={mgzData}
                RenderComponent={MagazineItem}
            />
        </StyledMagazineContainer>
    );
};

const StyledMagazineContainer = styled.div<{ pageAnim: any }>`
    height: 5000px;
    animation: ${({ pageAnim }) => pageAnim} 1s;
    animation-fill-mode: forwards;
`;

const StyledMagazineHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-top: -20px;
    padding-bottom: 15px;
`;

export default Magazine;
