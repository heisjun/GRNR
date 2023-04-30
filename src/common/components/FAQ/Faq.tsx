import React, { useState } from 'react';
import styled from 'styled-components';
import { IFaq } from './Faq.type';
import * as DOMPurify from 'dompurify';

const Faq: React.FC<IFaq> = ({ data }) => {
    const [isActive, setIsActive] = useState([false]);

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

    const faqLIst = [
        {
            title: '관리 난이도(Care level)',
            answer: data?.faqLevel,
        },
        {
            title: '물(Watering)',
            answer: data?.faqWater,
        },
        {
            title: '빛과 공간(Light&Placement)',
            answer: data?.faqLightPlace,
        },
        {
            title: '온도(Temperature)',
            answer: data?.faqTemperature,
        },
        {
            title: '습도(Humidity)',
            answer: data?.faqHumidity,
        },
        {
            title: '독성(Toxicity)',
            answer: data?.faqToxicity,
        },
        {
            title: '비료(Fertilizer)',
            answer: data?.faqFertilizer,
        },
        {
            title: '해충(Pest)',
            answer: data?.faqPest,
            pestInfo: data?.plantContentPestFeedDtoList,
        },
    ];

    return (
        <StyledGuideContainer>
            <StyledGuideTitle>
                <StyledBoldText>자주 묻는 질문</StyledBoldText>
            </StyledGuideTitle>

            {faqLIst.map((item, index) => (
                <StyledQuestionTitleBlock key={index} isClick={isActive[index]}>
                    <div
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        onClick={() => (isActive[index] ? onCloseBtn(index) : onOpenBtn(index))}
                    >
                        <div style={{ display: 'flex' }}>
                            <StyledQuestionIcon>FAQ {index + 1}.</StyledQuestionIcon>
                            <StyledQuestionTitle>{item.title}</StyledQuestionTitle>
                        </div>
                        {isActive[index] ? (
                            <StyledIcon src={'/btnDropUp.png'} />
                        ) : (
                            <StyledIcon src={'/btnDropdown.png'} />
                        )}
                    </div>
                    {isActive[index] && (
                        <>
                            <div>
                                <StyledQuestionBorder />
                                <StyledQuestionAnswer
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(item.answer ?? ''),
                                    }}
                                />
                            </div>
                            {item.pestInfo?.length !== 0 && (
                                <>
                                    {item.pestInfo?.map((item, idx) => (
                                        <>
                                            <PestBoxContainer key={idx}>
                                                <PestImage>
                                                    <img src={item.pestUrl} alt="" />
                                                </PestImage>
                                                <PestExplainContainer>
                                                    <PestName>{item.pestName}</PestName>
                                                    <PestName>설명</PestName>
                                                    <PestName>{item.pestExplanation}</PestName>
                                                    <PestName>증상</PestName>
                                                    <PestName>{item.pestSymptom}</PestName>
                                                    <PestName>치료</PestName>
                                                    <PestName>{item.pestTherapy}</PestName>
                                                </PestExplainContainer>
                                            </PestBoxContainer>
                                            <LineStyle />
                                        </>
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </StyledQuestionTitleBlock>
            ))}
        </StyledGuideContainer>
    );
};

const StyledQuestionAnswer = styled.div`
    padding: 24px 24px 27px;
    font-family: AppleSDGothicNeo;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 130%;
    letter-spacing: normal;
    color: #3d3d3d;
`;
const StyledQuestionBorder = styled.div`
    width: 1092px;
    height: 1px;
    margin: 20px 24px 0px;
    opacity: 0.65;
    background-color: #dadada;
`;
const StyledQuestionIcon = styled.div`
    margin: 4px 10px 0px 24px;
    font-family: AppleSDGothicNeo;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #0d6637;
`;

const StyledQuestionTitleBlock = styled.div<{ isClick: boolean }>`
    width: 1140px;
    background-color: #f2f4f6;
    cursor: pointer;
    margin-bottom: 16px;
    padding: ${({ isClick }) => (isClick ? '20px 0px 0px' : '20px 0px')};
`;

const StyledQuestionTitle = styled.div`
    height: 19px;
    margin: 3px 0px 0px 10px;
    font-family: AppleSDGothicNeo;
    font-size: 16px;
    font-weight: bold;
    color: #454545;
`;

const StyledBoldText = styled.div`
    font-size: 30px;
    font-weight: bold;
    color: #272727;
`;
const StyledGuideContainer = styled.div`
    width: 100%;
    margin-top: 120px;
    margin-bottom: 120px;
`;

const StyledGuideTitle = styled.div`
    text-align: center;
    margin-bottom: 34px;
`;

const StyledIcon = styled.img`
    width: 24px;
    height: 24px;
    margin: 0 24px 0px 0px;
    object-fit: contain;
    cursor: pointer;
`;

const PestBoxContainer = styled.div`
    display: flex;
`;

const PestImage = styled.div`
    padding: 0 24px;
    img {
        width: 350px;
        object-fit: contain;
    }
`;

const PestExplainContainer = styled.div`
    padding-right: 20px;
    min-height: 250px;
`;

const PestName = styled.div`
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 130%;
    letter-spacing: normal;
    color: #3d3d3d;
    margin-bottom: 10px;
`;

const LineStyle = styled.div`
    margin: 30px 0;
    height: 1px;
    border-top: 1px solid #d9d9d9;
`;

export default Faq;
