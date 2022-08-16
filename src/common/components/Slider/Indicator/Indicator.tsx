import React from 'react';
import styled from 'styled-components';
import { IIndicator } from './Indicator.type';

const Indicator: React.FC<IIndicator> = (props) => {
    const { index, setIndex, data } = props;

    function onMove(index: number) {
        setIndex(index);
    }
    return (
        <div>
            <StyledBackground>
                {data.map((item: any, idx: number) => {
                    return (
                        <StyledCircle key={idx} onClick={() => onMove(idx)}>
                            <StyledMover
                                style={{
                                    transform: `translateX(${(index - idx) * 40}px)`,
                                }}
                            />
                        </StyledCircle>
                    );
                })}
            </StyledBackground>
        </div>
    );
};

const StyledBackground = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledCircle = styled.div`
    width: 10px;
    height: 10px;
    background-color: #ddd;
    position: relative;
    border-radius: 10px;
    margin-right: 4px;
    overflow: hidden;
`;
const StyledMover = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: gray;
    transition: transform 0.5s ease;
`;

export default Indicator;
