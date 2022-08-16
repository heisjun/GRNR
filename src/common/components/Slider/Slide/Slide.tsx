import React from 'react';
import styled from 'styled-components';
import { ISlide } from './Slide.type';

const Slide: React.FC<ISlide> = (props) => {
    const { ImgUrl } = props;
    return (
        <div>
            <StyledImg src="/sample2.jpg"></StyledImg>
            <StyledSpace />
            <StyledViews> 조회 312,231명</StyledViews>
            <StyledTextArea>
                <StyledText>{ImgUrl}</StyledText>
            </StyledTextArea>
        </div>
    );
};

const StyledImg = styled.img`
    width: 100%;
    height: 440px;
`;

const StyledSpace = styled.div`
    padding: 10px;
    text-align: center;
`;

const StyledViews = styled.div`
    width: 100%;
    font-size: 15px;
    font-weight: 500;
    color: grey;
    padding: 10px;
`;

const StyledTextArea = styled.div`
    width: 100%;
`;

const StyledText = styled.div`
    font-size: 15px;
    font-weight: 300;
    color: grey;
    padding-left: 10px;
`;

export default Slide;
