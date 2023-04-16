import React from 'react';
import styled from 'styled-components';
import { IPlantGuideProps } from './PlantGuide.interface';
import * as DOMPurify from 'dompurify';

const data = {
    index: ['1', '2', '3', '4'],
    korIndex: ['공간', '물주기', '비료', '해충'],
    engIndex: ['Placement', 'Water', 'Fertilizer', 'Pest'],
    picUrl: ['1', '2', '3', '4'],
    text: [
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라만세 무궁화 삼천리 화려강산, 대한사람 대한으로 길이 보전하세',
        '물주기설명',
        '비료설명',
        '해충설명',
    ],
};

const PlantGuide: React.FC<IPlantGuideProps> = ({ data }) => {
    return (
        <StyledGuideContainer>
            <StyledGuideTitle>
                <StyledBoldText>PLANT GUIDE</StyledBoldText>
            </StyledGuideTitle>
            <StyledGuideBlock>
                <StyledPlaceBlock>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <StyledIconImg src={'/placeIcon.png'} />
                            <StyledText>공간</StyledText>
                        </div>
                        <StyledVerticleBorder />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <StyledExplainText
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.plantGuideSpace ?? '') }}
                            />
                            <StyledDetailBtn>
                                <StyledBtnText>자세히 보기</StyledBtnText>
                            </StyledDetailBtn>
                        </div>
                    </div>
                </StyledPlaceBlock>
                <StyledWaterBlock>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <StyledIconImg src={'/waterIcon.png'} />
                            <StyledText>물</StyledText>
                        </div>
                        <StyledVerticleBorder />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <StyledExplainText
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.plantGuideWater ?? '') }}
                            />
                            <StyledDetailBtn>
                                <StyledBtnText>자세히 보기</StyledBtnText>
                            </StyledDetailBtn>
                        </div>
                    </div>
                </StyledWaterBlock>
                <StyledFertilizerBlock>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <StyledIconImg src={'/fertilizerIcon.png'} />
                            <StyledText>비료</StyledText>
                        </div>
                        <StyledVerticleBorder />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <StyledExplainText
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(data?.plantGuideFertilizer ?? ''),
                                }}
                            />
                            <StyledDetailBtn>
                                <StyledBtnText>자세히 보기</StyledBtnText>
                            </StyledDetailBtn>
                        </div>
                    </div>
                </StyledFertilizerBlock>
                <StyledPestBlock>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <StyledIconImg src={'/antiBugIcon.png'} />
                            <StyledText>해충</StyledText>
                        </div>
                        <StyledVerticleBorder />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <StyledExplainText
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data?.plantGuidePest ?? '') }}
                            />
                            <StyledDetailBtn>
                                <StyledBtnText>자세히 보기</StyledBtnText>
                            </StyledDetailBtn>
                        </div>
                    </div>
                </StyledPestBlock>
            </StyledGuideBlock>
        </StyledGuideContainer>
    );
};

const StyledDetailBtn = styled.div`
    width: 94px;
    height: 30px;
    margin: 18px 0px 0px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0d6637;
    cursor: pointer;
`;

const StyledBtnText = styled.span`
    font-family: NotoSansKR;
    font-size: 13px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #fff;
`;

const StyledIconImg = styled.img`
    width: 70px;
    height: 70px;
    margin-bottom: 18px;
    object-fit: contain;
`;

const StyledText = styled.div`
    font-family: NotoSansKR;
    font-size: 20px;
    font-weight: bold;
    color: #272727;
`;

const StyledExplainText = styled.div`
    font-family: NotoSansKR;
    font-size: 16px;
    color: #424242;
    line-height: 150%;
`;

const StyledVerticleBorder = styled.div`
    width: 1px;
    height: 90px;
    margin: 13px 32px 18px;
    background-color: #e3e3e3;
`;
const StyledBoldText = styled.div`
    font-size: 30px;
    font-weight: bold;

    color: #272727;
`;
const StyledGuideContainer = styled.div`
    width: 100%;
    margin-top: 120px;
`;

const StyledGuideTitle = styled.div`
    text-align: center;
`;

const StyledGuideBlock = styled.div`
    width: 1140px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 40px;
    margin-top: 30px;
`;

const BasicBlock = styled.div`
    width: 49%;
    height: 190px;
    box-sizing: border-box;
    padding: 37px 33px 32px 32px;
    box-shadow: 0 8px 30px 0 rgba(0, 0, 0, 0.04);
    border: solid 1px #e7e7e7;
    background-color: #fff;
`;

const StyledPlaceBlock = styled(BasicBlock)`
    margin-bottom: 20px;
    margin-right: 20px;
`;

const StyledWaterBlock = styled(BasicBlock)`
    margin-bottom: 20px;
`;

const StyledFertilizerBlock = styled(BasicBlock)`
    margin-right: 20px;
`;

const StyledPestBlock = styled(BasicBlock)``;

export default PlantGuide;
