import React from 'react';
import styled from 'styled-components';
import Avatar from '../Avatar';
import { IQuestionItem } from './QuestionItem.type';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const Example = [
    {
        id: 1,
        keyword: '키워드1',
    },
    {
        id: 2,
        keyword: '키워드2',
    },
    {
        id: 3,
        keyword: '키워드3',
    },
];

const QuestionItem: React.FC<IQuestionItem> = (props) => {
    const { data } = props;

    function truncate(text: string) {
        const replaced = text.replace(/\n/g, ' ');
        if (replaced.length <= 100) {
            return replaced;
        }
        return replaced.slice(0, 100).concat('...');
    }
    return (
        <>
            {data.map((question: any) => (
                <StyledItemContainer key={question.url}>
                    <StyledItemContent>
                        <StyledContentWriting>
                            <StyledContentTitle>{question.title}</StyledContentTitle>
                            <StyledContentBody>{question.description}</StyledContentBody>
                        </StyledContentWriting>
                        <StyledContentPicture>
                            <StyledImgWrapper>
                                <StyledImg src={question.urlToImage} alt="사진" />
                            </StyledImgWrapper>
                        </StyledContentPicture>
                    </StyledItemContent>
                    <StyledItemInfo>
                        <Avatar width="3%" paddingBottom="3%" borderRadius="100%" />
                        <StyledUserInfo>
                            <StyledInfoText>닉네임</StyledInfoText>|<StyledInfoText>시간</StyledInfoText>|
                            <StyledInfoText>댓글</StyledInfoText>|<StyledInfoText>조회수</StyledInfoText>
                        </StyledUserInfo>
                        {Example.map((e) => (
                            <StyledKeyword key={e.id}>{e.keyword}</StyledKeyword>
                        ))}
                    </StyledItemInfo>
                    <StyledBorderLine />
                </StyledItemContainer>
            ))}
        </>
    );
};

const StyledImg = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
`;
const StyledItemContainer = styled.div`
    padding-top: 25px;
`;

const StyledImgWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 0px;
    padding-bottom: 100%;
    overflow: hidden;
`;

const StyledItemContent = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StyledContentWriting = styled.div`
    width: 75%;
`;

const StyledContentPicture = styled.div`
    width: 15%;
    border-radius: 5px;
`;
const StyledContentTitle = styled.div`
    font-size: 20px;
    font-weight: 400;
    color: gray;
    padding-bottom: 10px;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 3vw;
    }
`;

const StyledContentBody = styled.div`
    font-size: 14px;
    color: gray;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 2.2vw;
    }
`;

const StyledItemInfo = styled.div`
    padding-bottom: 10px;
    display: flex;
    align-items: center;
`;

const StyledBorderLine = styled.hr`
    margin: 0px;
`;

const StyledUserInfo = styled.div`
    display: flex;
    font-size: 13px;
    color: grey;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 1.5vw;
    }
`;

const StyledInfoText = styled.div`
    padding-left: 10px;
    padding-right: 10px;
    @media screen and (max-width: ${boundaryWidth}px) {
        padding-left: 5px;
        padding-right: 5px;
    }
`;

const StyledKeyword = styled.div`
    color: gray;
    font-size: 13px;
    border: 1px solid gray;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 15px;
    margin-right: 5px;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 1.5vw;
        padding: 1%;
    }
`;
export default QuestionItem;
