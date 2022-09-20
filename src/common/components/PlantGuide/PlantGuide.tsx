import React from 'react';
import styled from 'styled-components';
import PlantGuideItem from '../PlantGuideItem';
import { BsSun } from 'react-icons/bs';
import { GiFertilizerBag, GiWateringCan, GiLongAntennaeBug } from 'react-icons/gi';

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

const PlantGuide: React.FC = () => {
    return (
        <StyledGuideContainer>
            <StyledGuideTitle>
                <StyledText>몬스테라 테라로사</StyledText>
                <StyledBoldText>PLANT GUIDE</StyledBoldText>
            </StyledGuideTitle>
            <StyledGuideBlock>
                <StyledPlaceBlock>
                    <BsSun style={{ fontSize: 30, color: 'gray', paddingBottom: '1vw' }} />
                    <StyledText>공간</StyledText>
                    <StyledText>공간에 대한 설명</StyledText>
                </StyledPlaceBlock>
                <StyledWaterBlock>
                    <GiWateringCan style={{ fontSize: 30, color: 'gray', paddingBottom: '1vw' }} />
                    <StyledText>물주기</StyledText>
                    <StyledText>물에 대한 설명</StyledText>
                </StyledWaterBlock>
                <StyledFertilizerBlock>
                    <GiFertilizerBag style={{ fontSize: 30, color: 'gray', paddingBottom: '1vw' }} />
                    <StyledText>비료</StyledText>
                    <StyledText>비료에 대한 설명</StyledText>
                </StyledFertilizerBlock>
                <StyledPestBlock>
                    <GiLongAntennaeBug style={{ fontSize: 30, color: 'gray', paddingBottom: '1vw' }} />
                    <StyledText>해충</StyledText>
                    <StyledText>해충에 대한 설명</StyledText>
                </StyledPestBlock>
            </StyledGuideBlock>
            <PlantGuideItem data={data} />
        </StyledGuideContainer>
    );
};

const StyledText = styled.div`
    font-size: 15px;
    padding-bottom: 0.5vw;
    color: gray;
`;

const StyledBoldText = styled.div`
    font-size: 25px;
    font-weight: 900;
    color: gray;
`;
const StyledGuideContainer = styled.div`
    width: 100%;
`;

const StyledGuideTitle = styled.div`
    text-align: center;
`;

const StyledGuideBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 40px;
    margin-top: 40px;
`;

const BasicBlock = styled.div`
    width: 49%;
    height: 200px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`;

const StyledPlaceBlock = styled(BasicBlock)`
    border-bottom: 0.5px solid gray;
    border-right: 0.5px solid gray;
`;

const StyledWaterBlock = styled(BasicBlock)`
    border-bottom: 0.5px solid gray;
    border-left: 0.5px solid gray;
`;

const StyledFertilizerBlock = styled(BasicBlock)`
    border-top: 0.5px solid gray;
    border-right: 0.5px solid gray;
`;

const StyledPestBlock = styled(BasicBlock)`
    border-top: 0.5px solid gray;
    border-left: 0.5px solid gray;
`;

export default PlantGuide;
