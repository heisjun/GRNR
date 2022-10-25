import styled from 'styled-components';
import { Profile } from 'domains';
import QuestionItem from 'common/components/QuestionItem';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MyAnswer: React.FC = () => {
    const [questions, setQuestions] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://43.201.2.18/api/api/inquiry/recent`);
                setQuestions(response.data.value.content);
                console.log(response.data.value.content);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading || !questions) {
        return <StyledMyAnswerContainer>대기중</StyledMyAnswerContainer>;
    }
    return (
        <StyledMyAnswerContainer>
            <StyledProfileContainer>
                <StyledProfileBlock>
                    <Profile />
                </StyledProfileBlock>
            </StyledProfileContainer>
            <StyledContextContainer>
                <StyledContextBlock>
                    <StyledContextTitle>나의 답변 5</StyledContextTitle>
                    <QuestionItem data={questions} />
                </StyledContextBlock>
            </StyledContextContainer>
        </StyledMyAnswerContainer>
    );
};

const StyledProfileBlock = styled.div`
    position: relative;
    width: 90%;
    padding-bottom: 150%;
`;
const StyledContextBlock = styled.div`
    position: relative;
    width: 90%;
    padding-left: 10%;
`;

const StyledProfileContainer = styled.div`
    width: 25%;
`;

const StyledContextContainer = styled.div`
    width: 75%;
    height: 5000px;
`;

const StyledContextTitle = styled.div`
    color: gray;
    font-size: 16px;
    font-weight: 600;
    margin-top: 5px;
`;

const StyledMyAnswerContainer = styled.div`
    margin-top: 30px;
    width: 100%;
    display: flex;
`;

export default MyAnswer;
