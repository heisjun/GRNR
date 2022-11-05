import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ITaggedPhoto } from 'common/types';

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
                    <StyledImg src={item.pictureUrl} width="100%" height="100%" imgAnim={imgAnim} />
                </StyledImageBlock>
            </StyledImageContainer>
            <StyledDetailsText>{item.explain}</StyledDetailsText>

            <div style={{ display: 'flex', padding: 10 }}>
                {item.tagList &&
                    item.tagList.map((i, index) => (
                        <div key={index}>
                            <div style={{ color: 'lightblue', paddingRight: 10 }}>#{i.tagName}</div>
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

const StyledBorderLine = styled.div`
    width: 100%;
    border-bottom: solid 1px;
    border-color: silver;
    margin: 30px 0px 30px 0px;
`;

const StyledDetailsText = styled.div`
    font-size: 15px;
    font-weight: 100;
    color: grey;
    padding: 10px;
`;

const StyledTagBoxesBlock = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 5px 0px 5px px;
`;

const StyledImg = styled.img<{ imgAnim: any }>`
    cursor: pointer;
    animation: ${({ imgAnim }) => imgAnim} 0.2s;
    animation-fill-mode: forwards;
`;

const StyledImageBlock = styled.div`
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
`;

const StyledImageContainer = styled.div<{ width: string; height?: string; paddingBottom?: string }>`
    position: relative;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
    background-color: grey;
`;

const StyledTaggedPhotoContainer = styled.div``;

export default TaggedPhoto;
