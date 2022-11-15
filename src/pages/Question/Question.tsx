import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaChevronRight } from 'react-icons/fa';
import QuestionItem from 'common/components/QuestionItem';
import axios from 'axios';
import CustomSelector from 'common/components/CustomSelector';
import { FadeIn, FadeOut } from 'common/keyframes';
import { Link, useNavigate } from 'react-router-dom';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const QuestionFilter = [
    {
        id: 1,
        name: '지역',
        list: ['공개', '비공개'],
    },
    {
        id: 2,
        name: '공간',
        list: ['원룸', '거실', '침실', '주방', '욕실', '베란다', '사무실', '가게', '야외정원'],
    },
    {
        id: 3,
        name: '관리 팁',
        list: ['빛', '습도', '온도', '물주기', '분갈이', '해충', '흙', '영양제 & 비료', '플렌테리어'],
    },
    {
        id: 4,
        name: '제품 추천',
        list: ['가드닝 툴', '화분', '흙', '식물 재배기', '식물 생장등', '기타'],
    },
    {
        id: 5,
        name: '식물병원',
        list: [
            '갑자기 잎이 떨어져요',
            '잎에 구멍이 났어요',
            '잎의 색이 변했어요',
            '꽃봉오리가 떨어졌어요',
            '꽃이 피지 않아요',
            '잎 끝이 갈색으로 물들어가요',
            '잎과 줄기가 시들어가요',
            '잎과 줄기가 털로 뒤덮였어요',
            '잎에 반점이 생겼어요',
            '잎이 말라가요',
        ],
    },
    {
        id: 6,
        name: '기타',
        list: ['이름에 뭐에요?'],
    },
];

const option = [
    {
        id: 1,
        name: '정렬',
        list: ['인기순', '최신순'],
    },
];

const Question: React.FC = () => {
    const navigate = useNavigate();
    const [getOption, setGetOption] = useState('');
    const [test, setTest] = useState('recent');

    useEffect(() => {
        if (getOption === '인기순') {
            setTest('popularity');
        } else setTest('recent');
    }, [getOption]);

    const [questions, setQuestions] = useState([{}, {}]);
    const [loading, setLoading] = useState(false);

    const [pageAnim, setPageAnim] = useState<any>(FadeIn);
    const [viewAll, setViewAll] = useState<boolean>(false);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://43.201.2.18/api/api/inquiry/${test}`);
                setQuestions(response.data.value.content);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, [getOption]);

    useEffect(() => {
        setPageAnim(FadeIn);
        return () => {
            setPageAnim(FadeOut);
        };
    }, []);

    return (
        <StyledQuestionContainer pageAnim={pageAnim}>
            <StyledQuestionBanner view={viewAll}>
                <StyledHeaderText>궁금한 점을 키워드로 빠르게 확인해 보세요</StyledHeaderText>
                <div>{searchKeyword}</div>
                <StyledHeaderKeyword>
                    <StyledKeywordIndex>인기</StyledKeywordIndex>
                    <StyledKeyword>키워드1</StyledKeyword>
                    <StyledKeyword>키워드2</StyledKeyword>
                    <StyledKeyword>키워드3</StyledKeyword>
                    <StyledKeyword>키워드4</StyledKeyword>
                    <StyledAllKeyword onClick={() => setViewAll(!viewAll)}>
                        {!viewAll ? '키워드 더보기' : '키워드 접기'}
                    </StyledAllKeyword>
                </StyledHeaderKeyword>
                {viewAll && (
                    <div>
                        {QuestionFilter.map((item, index) => {
                            return (
                                <StyledHeaderKeyword>
                                    <StyledKeywordIndex>{item.name}</StyledKeywordIndex>
                                    {item.list.map((list, index) => {
                                        return (
                                            <StyledKeyword
                                                onClick={() => {
                                                    setSearchKeyword(list);
                                                    navigate(`/community/question/${list}`, {
                                                        state: list,
                                                    });
                                                }}
                                            >
                                                {list}
                                            </StyledKeyword>
                                        );
                                    })}
                                </StyledHeaderKeyword>
                            );
                        })}
                    </div>
                )}
            </StyledQuestionBanner>
            <StyledQuestionBlock>
                <StyledNoticeContent>
                    <StyledNoticeBlock>
                        <StyledNoticeIcon>공지</StyledNoticeIcon>
                        <StyledNoticeText>진짜 로그인 구별하는 방법</StyledNoticeText>
                    </StyledNoticeBlock>
                    <StyledNoticeDate>2022.10.02</StyledNoticeDate>
                </StyledNoticeContent>
            </StyledQuestionBlock>
            <StyledQuestionBlock>
                <StyledFeedHeader>
                    <CustomSelector optionData={option} setGetOption={setGetOption} />
                    <Link to={`./new`} style={{ textDecoration: 'none' }}>
                        <StyledQuestionBtn>질문하기</StyledQuestionBtn>
                    </Link>
                </StyledFeedHeader>
                {questions && <QuestionItem data={questions} />}
            </StyledQuestionBlock>
        </StyledQuestionContainer>
    );
};

const StyledNoticeDate = styled.div`
    font-family: NotoSansKR;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #999;
`;
const StyledQuestionContainer = styled.div<{ pageAnim: any }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: ${({ pageAnim }) => pageAnim} 1s;
    animation-fill-mode: forwards;
`;

const StyledBorderLine = styled.hr`
    margin: 0px;
`;

const StyledQuestionBanner = styled.div<{ view: boolean }>`
    box-sizing: border-box;
    width: 100%;
    max-width: 1920px;
    height: 360px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: linear-gradient(257deg, #15ff92 79%, #49715c 25%);
    padding: 5%;
    ${(props) =>
        props.view &&
        `height: 650px;
  `};
`;

const StyledHeaderText = styled.div`
    font-size: 32px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #fff;
`;

const StyledHeaderKeyword = styled.div`
    margin-left: 15%;
    margin-right: 15%;
    padding: 1vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

const StyledNoticeContent = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 0px 16px;
    background-color: #f8f8f8;
    border-bottom: 1px solid #ececec;
`;

const StyledNoticeBlock = styled.div`
    display: flex;
`;
const StyledNoticeIcon = styled.div`
    color: white;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 30px;
    border-radius: 15px;
    background-color: #0d6637;
    margin-right: 22px;
`;

const StyledNoticeText = styled.div`
    display: flex;
    align-items: center;
    font-family: NotoSansKR;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #272727;
`;

const StyledQuestionBlock = styled.div`
    width: 1140px;
    padding-top: 30px;
    padding-bottom: 10px;
`;

const StyledQuestionBtn = styled.div`
    padding: 5px;
    background: #fff;
    border: 1px solid lightgrey;
    font-weight: 400;
    color: gray;
    border-radius: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 15px;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 1.5vw;
    }
`;

const StyledFeedHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    padding-top: 10px;
`;

const StyledKeyword = styled.div`
    color: gray;
    font-size: 13px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 15px;
    margin-right: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
    background-color: white;
    :hover {
        background-color: gray;
        color: white;
    }
    cursor: pointer;
`;

const StyledKeywordIndex = styled.div`
    color: gray;
    font-weight: bold;
    font-size: 13px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;

    margin-top: 5px;
    margin-bottom: 5px;
    width: 10%;
`;

const StyledAllKeyword = styled.div`
    color: gray;
    font-size: 13px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    text-align: end;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 60px;
    cursor: pointer;
`;

export default React.memo(Question);
