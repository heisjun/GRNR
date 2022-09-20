import React from 'react';
import styled from 'styled-components';
import { IGuideIndicator } from './GuideIndicator.type';

const GuideIndicator: React.FC<IGuideIndicator> = (props) => {
    const { index, setIndex, data } = props;

    function onMove(index: number) {
        setIndex(index);
    }
    return (
        <StyledIndicatorContainer>
            <StyledBackground>
                {data.map((item: any, idx: number) => {
                    return (
                        <StyledCircle key={idx} onClick={() => onMove(idx)}>
                            <StyledIndexText>{item}</StyledIndexText>
                            <StyledMover
                                style={{
                                    transform: `translateX(${(index - idx) * 65}px)`,
                                }}
                            />
                        </StyledCircle>
                    );
                })}
            </StyledBackground>
        </StyledIndicatorContainer>
    );
};

const StyledIndexText = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    color: gray;
    z-index: 1;
`;

const StyledIndicatorContainer = styled.div``;

const StyledBackground = styled.div`
    display: flex;
    justify-content: space-between;
    padding-left: 20%;
    padding-right: 20%;
`;

const StyledCircle = styled.div`
    width: 65px;
    height: 40px;
    position: relative;
    border-radius: 20px;
    margin-right: 4px;
    overflow: hidden;
    cursor: pointer;
`;
const StyledMover = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 65px;
    height: 40px;
    border-radius: 20px;
    background-color: lightgray;
    transition: transform 0.5s ease;
    z-index: 0;
`;

export default GuideIndicator;
