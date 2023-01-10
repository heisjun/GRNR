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
