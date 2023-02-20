import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ITaggedPhoto } from 'common/types';

const maxWidth = process.env.REACT_APP_MAX_WIDTH;

const TaggedPhoto: React.FC<ITaggedPhoto> = (props) => {
    const { width, height, paddingBottom, item } = props;

    const [imgAnim, setImgAnim] = useState<any>();

    return (
        <StyledTaggedPhotoContainer>
            <StyledImageContainer width={width} height={height} paddingBottom={paddingBottom}>
                <StyledImageBlock
                    onMouseEnter={() => {
                        setImgAnim(ImageScaleUp);
                    }}
                    onMouseLeave={() => {
                        setImgAnim(ImageScaleDown);
                    }}
                >
                    {item.video ? (
                        <StyledVideo src={item.pictureUrl} width="100%" height="100%" controls />
                    ) : (
                        <StyledImg src={item.pictureUrl} width="100%" height="100%" imgAnim={imgAnim} />
                    )}
                </StyledImageBlock>
            </StyledImageContainer>
            <StyledDetailsText>{item.explain}</StyledDetailsText>

            <div style={{ display: 'flex', paddingLeft: 16 }}>
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

const StyledDetailsText = styled.div`
    margin: 10px 16px;
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
    color: #0d6637;
`;

const StyledImg = styled.img<{ imgAnim: any }>`
    cursor: pointer;
    animation: ${({ imgAnim }) => imgAnim} 0.2s;
    animation-fill-mode: forwards;
`;

const StyledVideo = styled.video`
    cursor: pointer;
`;

const StyledImageBlock = styled.div`
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
`;

const StyledImageContainer = styled.div<{ width: string; height?: string; paddingBottom?: string }>`
    position: relative;
    width: 100%;
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

export default TaggedPhoto;
