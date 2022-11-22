import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import DailyPlant from '../DailyPlant';

const maxWidth = Number(process.env.REACT_APP_MAX_WIDTH) + 100;
const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const DailyInfo: React.FC = () => {
    const [imgAnim, setImgAnim] = useState<any>();

    return (
        <StyledDailyInfoContainer>
            <StyledDailyPlantBlock>
                <DailyPlant width="100%" height="100%" borderRadius="0px" imgUrls={['']} />
            </StyledDailyPlantBlock>
        </StyledDailyInfoContainer>
    );
};

const ImageScaleUp = keyframes`
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(1.1);
    }
`;

const ImageScaleDown = keyframes`
    0% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
`;

const StyledTipTitleText = styled.div`
    font-size: 30px;
    font-weight: bold;
    color: grey;
    margin-bottom: 1%;
`;

const StyledTipWriterText = styled.div`
    font-size: 12px;
    font-weight: 500;
    color: grey;
`;

const StyledImg = styled.img<{ imgAnim: any }>`
    cursor: pointer;
    object-fit: cover;
    animation: ${({ imgAnim }) => imgAnim} 0.2s;
    animation-fill-mode: forwards;
`;

const StyledTipImgBlock = styled.div`
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
`;

const StyledTipSummaryBlock = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    left: 5%;
    top: 70%;
`;

const StyledTipBlock = styled.div`
    position: relative;
    width: 74%;
    padding-bottom: 40%;
    margin-right: 1.5%;
    border: solid 1px;
    border-color: silver;
    cursor: pointer;
`;

const StyledDailyPlantBlock = styled.div`
    width: 100%;
`;

const StyledDailyInfoContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 1920px;
    height: 720px;
`;

export default DailyInfo;
