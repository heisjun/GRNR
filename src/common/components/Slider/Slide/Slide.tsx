import React from 'react';
import styled from 'styled-components';
import { ISlide } from './Slide.type';

const maxWidth = process.env.REACT_APP_MAX_WIDTH;

const Slide: React.FC<ISlide> = (props) => {
    const { data, index, viewCount } = props;
    return (
        <div>
            {data.video ? (
                <StyledVideo src={data.pictureUrlList[index]}></StyledVideo>
            ) : (
                <StyledImg src={data.pictureUrlList[index]}></StyledImg>
            )}

            <StyledSpace />
            <StyledViews>{`조회 ${viewCount} 회`}</StyledViews>
            <StyledTextArea>
                <StyledText>{data.textList[index]}</StyledText>
            </StyledTextArea>
        </div>
    );
};

const StyledImg = styled.img`
    width: 100%;
    height: 600px;
    @media screen and (min-width: ${maxWidth}px) {
        height: 600px;
    }
`;

const StyledVideo = styled.video`
    width: 100%;
    height: 600px;
    @media screen and (min-width: ${maxWidth}px) {
        height: 600px;
    }
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
    margin: 0px 24px 8px;
`;

const StyledTextArea = styled.div`
    width: 100%;
    margin: 0px 24px 8px;
`;

const StyledText = styled.div`
    font-size: 16px;
    color: #6a6a6a;
`;

export default Slide;
