import React from 'react';
import styled from 'styled-components';
import { IGuideSlide } from './GuideSlide.type';

const GuideSlide: React.FC<IGuideSlide> = (props) => {
    const { ImgUrl } = props;
    return (
        <div>
            <StyledStepText>STEP 1 {'>'} Placement</StyledStepText>
            <StyledGuideSlideContainer>
                <StyledImgBlock></StyledImgBlock>
                <StyledContentBlock>
                    <StyledIndexContent>{ImgUrl}</StyledIndexContent>
                </StyledContentBlock>
            </StyledGuideSlideContainer>
        </div>
    );
};
const StyledStepText = styled.div`
    color: gray;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 2vw;
`;

const StyledGuideSlideContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StyledImgBlock = styled.div`
    width: 35%;
    padding-bottom: 35%;
    background-color: gray;
    border-radius: 2px;
`;

const StyledContentBlock = styled.div`
    width: 60%;
`;

const StyledIndexContent = styled.div`
    color: gray;
    margin-top: 1vw;
    font-weight: 300;
`;

export default GuideSlide;
