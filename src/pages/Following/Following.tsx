import Filters from 'common/components/Filters';
import { useEffect, useState } from 'react';
import { ItemList, DictionaryItem } from 'common/components';
import styled from 'styled-components';
import axios from 'axios';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

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
const Following: React.FC = () => {
    const [getFilter, setGetFilter] = useState('');

    const [dictionaryCols, setDictionaryCols] = useState(window.innerWidth > Number(boundaryWidth) ? 3 : 2);
    const [dictionaryGap, setDictionaryGap] = useState(window.innerWidth > Number(boundaryWidth) ? 3.5 : 4);

    const [plants, setPlants] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    'https://newsapi.org/v2/top-headlines?country=kr&apiKey=54ddd330b78649a0985f758382740fac',
                );
                setPlants(response.data.articles);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const resizeHandler = () => {
        setDictionaryCols(window.innerWidth > Number(boundaryWidth) ? 3 : 2);
        setDictionaryGap(window.innerWidth > Number(boundaryWidth) ? 3.5 : 4);
    };

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    if (loading) {
        return <StyledDictionaryContainer>대기중</StyledDictionaryContainer>;
    }
    if (!plants) {
        return null;
    }

    return (
        <StyledDictionaryContainer>
            <StyledDictionaryHeader>
                <Filters setGetFilter={setGetFilter} data={DictionaryFilter} />
            </StyledDictionaryHeader>
            <StyledDictinaryBody>
                <ItemList
                    width="100%"
                    imgHeight="75%"
                    cols={dictionaryCols}
                    horizontalGap={dictionaryGap}
                    verticalGap={dictionaryGap}
                    items={plants}
                    RenderComponent={DictionaryItem}
                />
            </StyledDictinaryBody>
        </StyledDictionaryContainer>
    );
};

const StyledDictionaryContainer = styled.div`
    height: 5000px;
`;

const StyledDictionaryHeader = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const StyledDictinaryBody = styled.div`
    padding-top: 2%;
`;

export default Following;
