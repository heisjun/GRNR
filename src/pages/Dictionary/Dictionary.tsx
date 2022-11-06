import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ItemList, DictionaryItem, Filters_Test } from 'common/components';
import { FadeIn, FadeOut } from 'common/keyframes';
import axios from 'axios';
import { IDictionariesParams } from 'common/types';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const Dictionary_classification = [
    {
        id: 1,
        name: '분류',
        list: ['잎보기식물', '꽃보기식물', '열매보기식물', '선인장,다육식물'],
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
    const [slidePage, setSlidePage] = useState<number>(0);
    const [slideIdx, setSlideIdx] = useState<number>(0);

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
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, [location.search]);

    const leftButton = () => {
        if (slidePage > 0) {
            setSlidePage((prev) => prev - 1211);
            setSlideIdx((prev) => prev - 1);
        }
    };

    const rightButton = () => {
        if (dictionaries.length * 1211 > slidePage) {
            setSlidePage((prev) => prev + 1211);
            setSlideIdx((prev) => prev + 1);
        }
    };

    return (
        <StyledDictionaryContainer pageAnim={pageAnim}>
            <StyleBannerBoxStyle>
                {dictionaries.map((item, idx) => (
                    <StyledMainBannerContainer key={idx} slidePage={slidePage}>
                        <StyledImageContainer>
                            <img src={item.plantPicUrl} alt="" />
                            <StyledSlideButtonBox>
                                <StyledArrowStyle onClick={leftButton}>&#60;</StyledArrowStyle>
                                <em>/</em>
                                <StyledArrowStyle onClick={rightButton}>&#62;</StyledArrowStyle>
                            </StyledSlideButtonBox>
                        </StyledImageContainer>
                        <StyledContentContainer>
                            <StyledTextStyle>Editors's Pick</StyledTextStyle>
                            <StyledEnglishName>asdsad</StyledEnglishName>
                            <StyledKoreanName>{item.plantName}</StyledKoreanName>
                            <StyledContentBox>
                                10월 중순의 북쪽은 겨울의 시작이지만 남쪽은 여전히 가을이다. 내려오길 잘했다. 광주는
                                전라도의 유일한 광역시다. 남도의 맛있는 게 모여 있을 게 분명하다. 산을 타고 몸을 쓴 다음
                                밥을 먹으면 기가 막힌 코스가 될 것이다. 낯선 도시에 가면 내가 아는 룰이 의미를 잃는다.
                            </StyledContentBox>
                            <StyledKeywordContainer>
                                <StyledKeywordBox>키워드</StyledKeywordBox>
                                <StyledKeywordBox>키워드</StyledKeywordBox>
                                <StyledKeywordBox>키워드</StyledKeywordBox>
                            </StyledKeywordContainer>
                        </StyledContentContainer>
                    </StyledMainBannerContainer>
                ))}
                ;
            </StyleBannerBoxStyle>
            <StyledDotBox>
                {dictionaries.map((_, idx) => (
                    <StyledDot key={idx} slideIdx={slideIdx} idx={idx}>
                        <span></span>
                    </StyledDot>
                ))}
            </StyledDotBox>
            <StyledLine />
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
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {filterValue.classification}
                            <FaTimes onClick={() => handleFilterValue('', 'classification')} />
                        </div>
                    </StyledSelected>
                )}
                {filterValue.shape && (
                    <StyledSelected>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {filterValue.shape}
                            <FaTimes onClick={() => handleFilterValue('', 'shape')} style={{ paddingLeft: 3 }} />
                        </div>
                    </StyledSelected>
                )}
                {filterValue.difficulty && (
                    <StyledSelected>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {filterValue.difficulty}
                            <FaTimes onClick={() => handleFilterValue('', 'difficulty')} style={{ paddingLeft: 3 }} />
                        </div>
                    </StyledSelected>
                )}
                {filterValue.growSpeed && (
                    <StyledSelected>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {filterValue.growSpeed}
                            <FaTimes onClick={() => handleFilterValue('', 'growSpeed')} style={{ paddingLeft: 3 }} />
                        </div>
                    </StyledSelected>
                )}
                {filterValue.toxicity && (
                    <StyledSelected>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {filterValue.toxicity}
                            <FaTimes onClick={() => handleFilterValue('', 'toxicity')} style={{ paddingLeft: 3 }} />
                        </div>
                    </StyledSelected>
                )}
                {filterValue.dog && (
                    <StyledSelected>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {filterValue.dog}
                            <FaTimes onClick={() => handleFilterValue('', 'dog')} style={{ paddingLeft: 3 }} />
                        </div>
                    </StyledSelected>
                )}
                {filterValue.cat && (
                    <StyledSelected>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {filterValue.cat}
                            <FaTimes onClick={() => handleFilterValue('', 'cat')} style={{ paddingLeft: 3 }} />
                        </div>
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
            {dictionaries && (
                <ItemList
                    width="100%"
                    imgHeight="80%"
                    cols={magazineCols}
                    horizontalGap={magazineGap}
                    verticalGap={magazineGap}
                    items={dictionaries}
                    RenderComponent={DictionaryItem}
                />
            )}
        </StyledDictionaryContainer>
    );
};

interface IStyled {
    slidePage?: number;
    slideIdx?: number;
    idx?: number;
}

const StyleBannerBoxStyle = styled.div`
    width: 1140px;
    display: flex;
    overflow: hidden;
    margin: 40px 0 30px 0;
`;

const StyledMainBannerContainer = styled.div<IStyled>`
    position: relative;
    right: ${({ slidePage }) => `${slidePage}px`};
    display: flex;

    height: 480px;
    background-color: #f8f8f8;
`;

const StyledImageContainer = styled.div`
    position: relative;
    padding-right: 13px;
    width: 763px;
    height: 100%;
    img {
        width: 763px;
        height: 100%;
    }
`;

const StyledSlideButtonBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 0;
    padding: 11px 16px;
    width: 91px;
    height: 38px;
    background-color: white;
    z-index: 100;
    em {
        margin-top: 10px;
        font-size: 45px;
        font-weight: 300;
        color: #d8d8d8;
        transform: rotate(-15deg);
        line-height: 150%;
    }
`;

const StyledArrowStyle = styled.span`
    font-size: 40px;
    font-weight: 200;
    color: #4a4a4a;
    line-height: 150%;
    cursor: pointer;
    :hover {
        color: #9b9b9b;
    }
`;

const StyledContentContainer = styled.div`
    padding: 28px 41px 0 17px;
    width: 377px;
`;

const StyledTextStyle = styled.h3`
    margin: 0 196px 40px 0;
    width: 100%;
    height: 29px;
    font-size: 20px;
    font-weight: bold;
    line-height: 150%;
    color: #0d6637;
`;

const StyledEnglishName = styled.h4`
    width: 319px;
    margin: 40px 158px 11px 0;
    font-family: NotoSansKR;
    font-size: 18px;
    font-weight: 500;
    line-height: 150%;
    color: #8c8c8c;
`;

const StyledKoreanName = styled.h2`
    width: 319px;
    margin: 11px 106px 16px 0;
    font-family: NotoSansKR;
    font-size: 28px;
    font-weight: bold;
    line-height: 150%;
    color: #272727;
`;

const StyledContentBox = styled.p`
    width: 319px;
    height: 156px;
    margin: 16px 0 30px;
    font-family: NotoSansKR;
    font-size: 15px;
    line-height: 150%;
    color: #424242;
`;

const StyledDotBox = styled.div`
    margin-bottom: 40px;
    display: flex;
    overflow: hidden;
`;

const StyledDot = styled.div<IStyled>`
    min-width: ${({ slideIdx, idx }) => (slideIdx === idx ? '25px' : '10px')};
    height: 10px;
    margin: 30px 10px 0 0;
    border-radius: 5px;
    background-color: ${({ slideIdx, idx }) => (slideIdx === idx ? '#0d6637' : '#d8d8d8')};
`;

const StyledLine = styled.div`
    width: 1140px;
    height: 1px;
    margin: 40px 0px;
    background-color: #ececec;
`;

const StyledKeywordContainer = styled.div`
    display: flex;
`;

const StyledKeywordBox = styled.div`
    margin: 0 8px 0 0;
    padding: 6px 12px;
    border-radius: 16px;
    border: solid 1px #dedede;
    background-color: #fff;
    font-size: 14px;
`;

const StyledDictionaryHeader = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const StyledDictionaryContainer = styled.div<{ pageAnim: any }>`
    width: 100%;
    animation: ${({ pageAnim }) => pageAnim} 1s;
    animation-fill-mode: forwards;
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
export default React.memo(Dictionary);
