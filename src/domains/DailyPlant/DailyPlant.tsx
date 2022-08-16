import { useState, useRef } from 'react';
import styled from 'styled-components';
import { IDailyPlant } from './DailyPlant.type';

const DailyPlant: React.FC<IDailyPlant> = (props) => {
    const { width, height, borderRadius, paddingBottom, imgUrls } = props;

    const slideRef = useRef<any>(null);
    return (
        <StyledDailyPlantContainer
            width={width}
            height={height ? height : ''}
            paddingBottom={paddingBottom ? paddingBottom : ''}
            borderRadius={borderRadius}
        >
            <StyledImgContainer pageNum={imgUrls.length} ref={slideRef}></StyledImgContainer>
        </StyledDailyPlantContainer>
    );
};

const StyledImgBlock = styled.div``;

const StyledImgContainer = styled.div<{ pageNum: number }>`
    width: ${({ pageNum }) => pageNum * 100}%;
    height: 100%;
`;

const StyledDailyPlantContainer = styled.div<{
    width: string;
    height: string;
    paddingBottom: string;
    borderRadius: string;
}>`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
    border-radius: ${({ borderRadius }) => borderRadius};
    border: solid 2px;
    border-radius: 5px;
    border-color: silver;
    cursor: pointer;
`;

export default DailyPlant;
