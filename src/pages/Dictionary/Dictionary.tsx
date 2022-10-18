import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ItemList, DictionaryItem, Filters, Filters_Test } from 'common/components';
import { FadeIn, FadeOut } from 'common/keyframes';
import axios from 'axios';
import { IDictionariesParams } from 'common/types';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

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

const Dictionary_classification = [
    {
        id: 1,
        name: '분류',
        list: ['잎보기식물', '꽃보기식물', '열매보기식물', '선인장&다육식물'],
    },
];

const Dictionary_shape = [
    {
        id: 2,
        name: '형태',
        list: ['관목형', '직립형', '덩굴형', '잔디형', '로제트형', '다육형'],
    },
];

const Dictionary_difficulty = [
    {
        id: 3,
        name: '관리 난이도',
        list: ['키우기 쉬운', '보통의', '키우기 어려운'],
    },
];

const Dictionary_growSpeed = [
    {
        id: 4,
        name: '특성',
        list: ['빠르게 자라는', '느리게 자라는'],
    },
];
const Dictionary_toxicity = [
    {
        id: 5,
        name: '독성',
        list: ['무해한', '주의가 필요한'],
    },
];
const Dictionary_dog = [
    {
        id: 6,
        name: '강아지',
        list: ['안전한', '주의가 필요한'],
    },
];

const Dictionary_cat = [
    {
        id: 6,
        name: '고양이',
        list: ['안전한', '주의가 필요한'],
    },
];

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const Dictionary: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [magazineCols, setMagazineCols] = useState(window.innerWidth > Number(boundaryWidth) ? 3 : 2);
    const [magazineGap, setMagazineGap] = useState(window.innerWidth > Number(boundaryWidth) ? 4 : 6);
    const [loading, setLoading] = useState(false);
    const [pageAnim, setPageAnim] = useState<any>(FadeIn);
    const [dictionaries, setDictionaries] = useState<IDictionariesParams[]>([]);
    const [selectedClassification, setSelectedClassification] = useState('');
    const [selectedShape, setSelectedShape] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [selectedGrowSpeed, setSelectedGrowSpeed] = useState('');
    const [selectedToxicity, setSelectedToxicity] = useState('');
    const [selectedDog, setSelectedDog] = useState('');
    const [selectedCat, setSelectedCat] = useState('');

    const [filterValue, setFilterValue] = useState({
        classification: '',
        shape: '',
        difficulty: '',
        growSpeed: '',
        toxicity: '',
        dog: '',
        cat: '',
    });
    const handleFilterValue = (value: string, name: string) => {
        setFilterValue((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const resizeHandler = () => {
        setMagazineCols(window.innerWidth > Number(boundaryWidth) ? 3 : 2);
        setMagazineGap(window.innerWidth > Number(boundaryWidth) ? 4 : 6);
    };

    useEffect(() => {
        const queryString = `?${filterValue.classification ? `classification=${filterValue.classification}` : ''}
        ${filterValue.shape ? `&shape=${filterValue.shape}` : ''}
        ${filterValue.difficulty ? `&difficulty=${filterValue.difficulty}` : ''}
        ${filterValue.growSpeed ? `&growSpeed=${filterValue.growSpeed}` : ''}
        ${filterValue.toxicity ? `&toxicity=${filterValue.toxicity}` : ''} 
        ${filterValue.dog ? `&dog=${filterValue.dog}` : ''} 
        ${filterValue.cat ? `&cat=${filterValue.cat}` : ''}       
`;
        const realQuery = queryString.replace(/\s+/g, '');

        navigate(`/community/dictionary/${realQuery}`);
    }, [
        filterValue.classification,
        filterValue.shape,
        filterValue.difficulty,
        filterValue.growSpeed,
        filterValue.toxicity,
        filterValue.dog,
        filterValue.cat,
    ]);

    const onReset = () => {
        setFilterValue({
            classification: '',
            shape: '',
            difficulty: '',
            growSpeed: '',
            toxicity: '',
            dog: '',
            cat: '',
        });
    };
    useEffect(() => {
        handleFilterValue(selectedClassification, 'classification');
    }, [selectedClassification]);

    useEffect(() => {
        handleFilterValue(selectedShape, 'shape');
    }, [selectedShape]);
    useEffect(() => {
        handleFilterValue(selectedDifficulty, 'difficulty');
    }, [selectedDifficulty]);
    useEffect(() => {
        handleFilterValue(selectedGrowSpeed, 'growSpeed');
    }, [selectedGrowSpeed]);
    useEffect(() => {
        handleFilterValue(selectedToxicity, 'toxicity');
    }, [selectedToxicity]);
    useEffect(() => {
        handleFilterValue(selectedDog, 'dog');
    }, [selectedDog]);
    useEffect(() => {
        handleFilterValue(selectedCat, 'cat');
    }, [selectedCat]);

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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://www.gardenersclub.co.kr/api/api/images/search${location.search}`,
                );
                setDictionaries(response.data.value.content);
                console.log(response.data.value.content);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, [location.search]);

    return (
        <StyledDictionaryContainer pageAnim={pageAnim}>
            <StyledDictionaryHeader>
                <Filters_Test setGetFilter={setSelectedClassification} data={Dictionary_classification} />
                <Filters_Test setGetFilter={setSelectedShape} data={Dictionary_shape} />
                <Filters_Test setGetFilter={setSelectedDifficulty} data={Dictionary_difficulty} />
                <Filters_Test setGetFilter={setSelectedGrowSpeed} data={Dictionary_growSpeed} />
                <Filters_Test setGetFilter={setSelectedToxicity} data={Dictionary_toxicity} />
                <Filters_Test setGetFilter={setSelectedDog} data={Dictionary_dog} />
                <Filters_Test setGetFilter={setSelectedCat} data={Dictionary_cat} />
            </StyledDictionaryHeader>
            <div style={{ display: 'flex', paddingBottom: 15 }}>
                {filterValue.classification && (
                    <StyledSelected>
                        {filterValue.classification}
                        <FaTimes onClick={() => handleFilterValue('', 'classification')} />
                    </StyledSelected>
                )}
                {filterValue.shape && (
                    <StyledSelected>
                        {filterValue.shape}
                        <FaTimes onClick={() => handleFilterValue('', 'shape')} />
                    </StyledSelected>
                )}
                {filterValue.difficulty && (
                    <StyledSelected>
                        {filterValue.difficulty}
                        <FaTimes onClick={() => handleFilterValue('', 'difficulty')} />
                    </StyledSelected>
                )}
                {filterValue.growSpeed && (
                    <StyledSelected>
                        {filterValue.growSpeed}
                        <FaTimes onClick={() => handleFilterValue('', 'growSpeed')} />
                    </StyledSelected>
                )}
                {filterValue.toxicity && (
                    <StyledSelected>
                        {filterValue.toxicity}
                        <FaTimes onClick={() => handleFilterValue('', 'toxicity')} />
                    </StyledSelected>
                )}
                {filterValue.dog && (
                    <StyledSelected>
                        {filterValue.dog}
                        <FaTimes onClick={() => handleFilterValue('', 'dog')} />
                    </StyledSelected>
                )}
                {filterValue.cat && (
                    <StyledSelected>
                        {filterValue.cat}
                        <FaTimes onClick={() => handleFilterValue('', 'cat')} />
                    </StyledSelected>
                )}
                {(filterValue.classification ||
                    filterValue.shape ||
                    filterValue.difficulty ||
                    filterValue.growSpeed ||
                    filterValue.toxicity ||
                    filterValue.dog ||
                    filterValue.cat) && <StyledSelected onClick={onReset}>초기화</StyledSelected>}
            </div>
            <ItemList
                width="100%"
                imgHeight="80%"
                cols={magazineCols}
                horizontalGap={magazineGap}
                verticalGap={magazineGap}
                items={dictionaries}
                RenderComponent={DictionaryItem}
            />
        </StyledDictionaryContainer>
    );
};

const StyledDictionaryHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-top: -20px;
`;

const StyledDictionaryContainer = styled.div<{ pageAnim: any }>`
    height: 5000px;
    animation: ${({ pageAnim }) => pageAnim} 1s;
    animation-fill-mode: forwards;
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
export default React.memo(Dictionary);
