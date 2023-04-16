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
            title: '1. 관리 난이도(Care level)',
            answer: data?.faqLevel,
        },
        {
            title: '2. 물(Watering)',
            answer: data?.faqWater,
        },
        {
            title: '3. 빛과 공간(Light&Placement)',
            answer: data?.faqLightPlace,
        },
        {
            title: '4. 온도(Temperature)',
            answer: data?.faqTemperature,
        },
        {
            title: '5. 습도(Humidity)',
            answer: data?.faqHumidity,
        },
        {
            title: '6. 독성(Toxicity)',
            answer: data?.faqToxicity,
        },
        {
            title: '7. 비료(Fertilizer)',
            answer: data?.faqFertilizer,
        },
        {
            title: '8. 해충(Pest)',
            answer: data?.faqPest,
            pestInfo: data?.plantContentPestFeedDtoList,
        },
    ];

    return (
        <StyledGuideContainer>
            <StyledGuideTitle>
                <StyledBoldText>자주묻는 질문</StyledBoldText>
            </StyledGuideTitle>
            <StyledBorder />
            {faqLIst.map((item, index) => (
                <StyledQuestionTitleBlock>
                    <div
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        onClick={() => (isActive[index] ? onCloseBtn(index) : onOpenBtn(index))}
                    >
                        <div style={{ display: 'flex' }}>
                            <StyledQuestionIcon>Q.</StyledQuestionIcon>
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
                            <div style={{ marginBottom: '30px' }}>
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

const StyledBorder = styled.div`
    width: 1140px;
    height: 1px;
    padding: 0px;
    background-color: #272727;
`;

const StyledQuestionAnswer = styled.div`
    margin: 24px 24px 0px;
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
    margin: 20px 24px 24px;
    opacity: 0.65;
    background-color: #dadada;
`;
const StyledQuestionIcon = styled.div`
    width: 16px;
    height: 19px;
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

const StyledQuestionTitleBlock = styled.div`
    width: 1140px;
    padding: 28px 0;
    border-bottom: 1px solid #272727;
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
    align-items: center;
    height: 400px;
`;

const PestImage = styled.div`
    padding: 0 24px;
    img {
        width: 350px;
        object-fit: contain;
    }
`;

const PestExplainContainer = styled.div`
    height: 250px;
    overflow: overlay;
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

export default Faq;
