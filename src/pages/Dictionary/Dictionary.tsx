import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ItemList, DictionaryItem, Filters } from 'common/components';

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

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const Dictionary: React.FC = () => {
    const [magazineCols, setMagazineCols] = useState(window.innerWidth > Number(boundaryWidth) ? 3 : 2);
    const [magazineGap, setMagazineGap] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 6);
    const mgzData = [{}, {}, {}, {}, {}, {}, {}, {}];

    const [selected, setSelected] = useState('');

    const resizeHandler = () => {
        setMagazineCols(window.innerWidth > Number(boundaryWidth) ? 3 : 2);
        setMagazineGap(window.innerWidth > Number(boundaryWidth) ? 4 : 6);
    };

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    return (
        <StyledDictionaryContainer>
            <StyledDictionaryHeader>
                <Filters setGetFilter={setSelected} data={DictionaryFilter} />
            </StyledDictionaryHeader>
            <ItemList
                width="100%"
                imgHeight="80%"
                cols={magazineCols}
                horizontalGap={magazineGap}
                verticalGap={magazineGap}
                items={mgzData}
                RenderComponent={DictionaryItem}
            />
        </StyledDictionaryContainer>
    );
};

const StyledDictionaryContainer = styled.div`
    height: 5000px;
`;

const StyledDictionaryHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    padding-bottom: 15px;
    margin-top: -20px;
`;

export default Dictionary;
