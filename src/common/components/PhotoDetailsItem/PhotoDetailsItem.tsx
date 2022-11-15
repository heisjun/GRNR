import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ITaggedPhoto } from 'common/types';

const maxWidth = process.env.REACT_APP_MAX_WIDTH;

const PhotoDetailsItem: React.FC<ITaggedPhoto> = (props) => {
    const { width, height, paddingBottom, item } = props;

    return (
        <StyledTaggedPhotoContainer>
            <StyledImageContainer width={width} height={height} paddingBottom={paddingBottom}>
                <StyledImageBlock>
                    <StyledImg src={item.pictureUrl} width="100%" height="100%" />
                </StyledImageBlock>
            </StyledImageContainer>
            <StyledDetailsText>{item.explain}</StyledDetailsText>

            <div style={{ display: 'flex' }}>
                {item.tagList &&
                    item.tagList.map((i, index) => (
                        <div key={index}>
                            <StyledTagText>#{i.tagName}</StyledTagText>
                        </div>
                    ))}
            </div>
        </StyledTaggedPhotoContainer>
    );
};

const StyledDetailsText = styled.div`
    margin: 20px 0px;
    font-family: NotoSansKR;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.63;
    letter-spacing: normal;
    color: #424242;
`;

const StyledTagText = styled.div`
    margin: 0px 3px 10px 0px;
    font-size: 16px;
    color: lightblue;
`;

const StyledImg = styled.img`
    cursor: pointer;
`;

const StyledImageBlock = styled.div`
    width: 100%;
    height: 100%;
`;

const StyledImageContainer = styled.div<{ width: string; height?: string; paddingBottom?: string }>`
    position: relative;
    width: 720px;
    height: 520px;
    padding-bottom: 0;
    background-color: grey;
    @media screen and (min-width: ${maxWidth}px) {
        width: 100%;
        height: 520px;
        padding-bottom: 0;
    }
`;

const StyledTaggedPhotoContainer = styled.div``;

export default PhotoDetailsItem;
