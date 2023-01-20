import React, { useState } from 'react';
import styled from 'styled-components';

const data = [{}, {}, {}, {}, {}, {}];

const TodaysQuestion = () => {
    const [isActive, setIsActive] = useState([false]);
    const [hover, setHover] = useState<boolean>(false);

    function onOpenBtn(index: number) {
        const newIsActive = [...isActive];
        newIsActive[index] = true;
        setIsActive(newIsActive);
    }

    function onCloseBtn(index: number) {
        const newIsActive = [...isActive];
        newIsActive[index] = false;
        setIsActive(newIsActive);
    }
    return (
        <StyledQuestionContainer>
            <StyledQuestionBlock
                onMouseEnter={() => {
                    setHover(true);
                }}
                onMouseLeave={() => {
                    setHover(false);
                }}
            >
                {hover && (
                    <StyledHoverBackgrouond>
                        <span>답변하러 가기</span>
                        <img src="/btnArrowGray.png" />
                    </StyledHoverBackgrouond>
                )}
                <StyledCategoryBox>
                    <span>카테고리</span>
                </StyledCategoryBox>
                <StyledQuestionTitle>
                    분갈이를 할 때 집에서 직접 할 수 있는 좋은 팁좀 공유부탁드려요
                </StyledQuestionTitle>
                <StyledQuestionContent>
                    화분이 너무 커진거같은데 집에서 혼자 분갈이 하려고 하는데요 어떻게 하면 좋을까요?
                </StyledQuestionContent>
            </StyledQuestionBlock>
        </StyledQuestionContainer>
    );
};

const StyledHoverBackgrouond = styled.div`
    background-color: rgb(0, 0, 0, 0.7);
    position: absolute;
    width: 366px;
    height: 170px;
    z-index: 1;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span {
        font-family: NotoSansKR;
        font-size: 22px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #fff;
    }
    img {
        width: 14px;
        height: 14px;
        margin: 10px 0 8px 10px;
    }
`;
const StyledQuestionTitle = styled.div`
    width: 334px;
    margin: 15px 0px 10px 0px;
    font-family: NotoSansKR;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #272727;
`;

const StyledQuestionContent = styled.div`
    width: 334px;
    font-family: NotoSansKR;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.62;
    letter-spacing: normal;
    color: #868686;
`;
const StyledCategoryBox = styled.div`
    box-sizing: border-box;
    width: 68px;
    height: 26px;
    margin: 0px 0px 10px 0;
    border-radius: 13px;
    background-color: #0d6637;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
        font-family: NotoSansKR;
        font-size: 12px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #fff;
    }
`;
const StyledQuestionContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const StyledQuestionBlock = styled.div`
    box-sizing: border-box;
    width: 366px;
    height: 170px;
    padding: 16px 16px 18px;
    background-color: #f8f8f8;
    position: relative;
`;

export default TodaysQuestion;
