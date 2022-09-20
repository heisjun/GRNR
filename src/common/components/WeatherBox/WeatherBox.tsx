import React from 'react';
import styled from 'styled-components';

const WeatherData = [{}, {}, {}, {}, {}, {}];

const WeatherBox = () => {
    return (
        <StyledWeatherBlock>
            <StyledLoctionInfo>
                <StyledLocationText>서대문구 신촌동</StyledLocationText>은 현재
            </StyledLoctionInfo>
            <StyledTempInfo>
                <StyledTempText>24.3˚</StyledTempText>
                <StyledWeatherInfo>
                    <StyledKorText>흐림</StyledKorText>
                    <StyledWtherText>어제보다 2.1˚down</StyledWtherText>
                </StyledWeatherInfo>
                <StyledSubInfo>
                    {WeatherData.map((item, index) => {
                        return (
                            <StyledContentsBlock key={index}>
                                <StyledWtherItem>항목</StyledWtherItem>
                                <StyledWtherFigure>수치</StyledWtherFigure>
                            </StyledContentsBlock>
                        );
                    })}
                </StyledSubInfo>
            </StyledTempInfo>
        </StyledWeatherBlock>
    );
};
const StyledContentsBlock = styled.div`
    display: flex;
`;

const StyledWeatherBlock = styled.div`
    width: 100%;
`;

const StyledLoctionInfo = styled.div`
    display: flex;
    font-size: 16px;
    margin-bottom: 10px;
    color: gray;
`;
const StyledLocationText = styled.div`
    font-weight: bold;
`;

const StyledTempInfo = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StyledTempText = styled.div`
    width: 35%;
    font-size: 6.5vw;
    font-weight: 900;
    color: gray;
`;

const StyledWeatherInfo = styled.div`
    padding-top: 20px;
    width: 30%;
`;

const StyledKorText = styled.div`
    font-size: 2vw;
    font-weight: bold;
    color: gray;
`;
const StyledWtherText = styled.div`
    font-size: 1.5vw;
    font-weight: bold;
    color: gray;
`;
const StyledSubInfo = styled.div`
    width: 35%;
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
`;

const StyledWtherItem = styled.div`
    color: lightgray;
    font-size: 1.2vw;
    font-weight: 500;
    margin-right: 8px;
    display: inline-block;
`;

const StyledWtherFigure = styled.div`
    color: gray;
    font-size: 1.2vw;
    font-weight: 500;
    margin-right: 8px;
`;

export default WeatherBox;
