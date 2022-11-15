import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '../Avatar';
import { IQuestionItem } from './QuestionItem.type';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const keyword = [{ key: '키워드1' }, { key: '키워드2' }];

const QuestionItem: React.FC<IQuestionItem> = (props) => {
    const { data } = props;

    return (
        <>
            {data.map((question: any, index: number) => (
                <StyledItemContainer key={index}>
                    <Link to={`./details/${question.inquiryId}`} style={{ textDecoration: 'none' }}>
                        <StyledItemContent>
                            <StyledContentWriting>
                                <StyledInfoText>2022.08.20</StyledInfoText>
                                <StyledContentTitle>제목</StyledContentTitle>
                                <StyledContentBody>내용</StyledContentBody>
                            </StyledContentWriting>
                            <StyledContentPicture>
                                <StyledImgWrapper>
                                    <StyledImg alt="사진" />
                                </StyledImgWrapper>
                            </StyledContentPicture>
                        </StyledItemContent>
                        <StyledItemInfo>
                            {keyword &&
                                keyword.map((e: any, index: number) => (
                                    <StyledKeyword key={index}>{e.key}</StyledKeyword>
                                ))}
                            <StyledInfoText>댓글 12</StyledInfoText>
                            <StyledInfoText>조회수 123</StyledInfoText>
                        </StyledItemInfo>
                    </Link>
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
    box-sizing: border-box;
    margin: 20px 0px;
    padding: 20px 20px 20px 30px;
    border: solid 1px #eaeaea;
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
    margin: 8px 0px 8px 0;
    font-family: NotoSansKR;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.22;
    letter-spacing: normal;
    color: #272727;
`;

const StyledContentBody = styled.div`
    font-family: NotoSansKR;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.6;
    letter-spacing: normal;
    color: #424242;
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
    font-family: NotoSansKR;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #9d9d9d;
    margin-right: 20px;
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
export default React.memo(QuestionItem);
