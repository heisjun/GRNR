import React from 'react';
import styled from 'styled-components';
import { ISlide } from './Slide.type';

const Slide: React.FC<ISlide> = (props) => {
    const { data, index } = props;
    return (
        <div>
            <StyledImg src={data.pictureUrlList[index]}></StyledImg>
            <StyledSpace />
            <StyledViews>{`조회 ${data.time} 회`}</StyledViews>
            <StyledTextArea>
                <StyledText>{data.text}</StyledText>
            </StyledTextArea>
        </div>
    );
};

const StyledImg = styled.img`
    width: 100%;
    height: 540px;
`;

const StyledSpace = styled.div`
    padding: 10px;
    text-align: center;
`;

const StyledViews = styled.div`
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    color: #393939;
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
