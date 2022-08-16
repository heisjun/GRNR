import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaChevronRight } from 'react-icons/fa';
import Filters from 'common/components/Filters';
import QuestionItem from 'common/components/QuestionItem';
import axios from 'axios';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const QuestionFilter = [
    {
        id: 1,
        name: '정렬',
        list: ['인기순', '최신순'],
    },
];

const Question: React.FC = () => {
    const [getFilter, setGetFilter] = useState('');

    const [questions, setQuestions] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    'https://newsapi.org/v2/top-headlines?country=kr&apiKey=54ddd330b78649a0985f758382740fac',
                );
                setQuestions(response.data.articles);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading || !questions) {
        return <StyledQuestionContainer>대기중</StyledQuestionContainer>;
    }

    return (
        <StyledQuestionContainer>
            <StyledQuestionBanner>
                <StyledHeaderText>궁금한 점을 키워드로 빠르게 확인해 보세요</StyledHeaderText>
                <StyledHeaderKeyword>
                    <StyledKeyword>키워드1</StyledKeyword>
                    <StyledKeyword>키워드2</StyledKeyword>
                    <StyledKeyword>키워드3</StyledKeyword>
                </StyledHeaderKeyword>
            </StyledQuestionBanner>
            <StyledQuestionBlock>
                <StyledNoticeContent>
                    <StyledNoticeBlock>
                        <StyledNoticeIcon>공지</StyledNoticeIcon>
                        <StyledNoticeText>진짜 로그인 구별하는 방법</StyledNoticeText>
                    </StyledNoticeBlock>
                    <FaChevronRight className="logo" />
                </StyledNoticeContent>
                <StyledBorderLine />
            </StyledQuestionBlock>
            <StyledQuestionBlock>
                <StyledFeedHeader>
                    <Filters setGetFilter={setGetFilter} data={QuestionFilter} />
                    <StyledQuestionBtn>질문하기</StyledQuestionBtn>
                </StyledFeedHeader>
                <QuestionItem data={questions} />
            </StyledQuestionBlock>
        </StyledQuestionContainer>
    );
};

const StyledQuestionContainer = styled.div`
    height: 5000px;
`;

const StyledBorderLine = styled.hr`
    margin: 0px;
`;

const StyledQuestionBanner = styled.div`
    background-color: lightgrey;
    padding: 5%;
    text-align: center;
`;

const StyledHeaderText = styled.div`
    color: gray;
    font-size: 25px;
    font-weight: bold;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 4vw;
    }
`;

const StyledHeaderKeyword = styled.div`
    padding: 15px;
    display: flex;
    justify-content: center;
`;

const StyledNoticeContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 15px;
    @media screen and (max-width: ${boundaryWidth}px) {
        padding-top: 7px;
        padding-bottom: 7px;
    }
    .logo {
        font-size: 14px;
        @media screen and (max-width: ${boundaryWidth}px) {
            font-size: 1.5vw;
        }
    }
`;

const StyledNoticeBlock = styled.div`
    display: flex;
`;
const StyledNoticeIcon = styled.div`
    background-color: gray;
    color: white;
    border-radius: 15px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 12px;
    margin-right: 10px;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 1.5vw;
    }
`;

const StyledNoticeText = styled.div`
    display: flex;
    align-items: center;
    color: gray;
    font-size: 12px;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 1.5vw;
    }
`;

const StyledQuestionBlock = styled.div`
    padding-top: 10px;
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
    background-color: white;
`;

export default Question;
