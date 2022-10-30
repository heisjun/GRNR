import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IMyphotoItem } from './MyphotoItem.type';

const MyphotoItem: React.FC<IMyphotoItem> = (props) => {
    const { width, height, paddingBottom, item } = props;
    console.log(item);

    const [imgAnim, setImgAnim] = useState<any>();

    return (
        <StyledMagazineItemContainer width={width} height={height} paddingBottom={paddingBottom}>
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
            <StyledStatsBlock>
                <StyledStatBlock>
                    <StyledLikeButton src={`${process.env.REACT_APP_BASE_SRC}/like.png`} />
                    <StyledCountText>{item.likeCount}</StyledCountText>
                </StyledStatBlock>
                <StyledStatBlock>
                    <StyledLikeButton src={`${process.env.REACT_APP_BASE_SRC}/comment.png`} />
                    <StyledCountText>{item.commentCount}</StyledCountText>
                </StyledStatBlock>
                <StyledStatBlock>
                    <StyledLikeButton src={`${process.env.REACT_APP_BASE_SRC}/scrap.png`} />
                    <StyledCountText>{item.scrapCount}</StyledCountText>
                </StyledStatBlock>
            </StyledStatsBlock>
        </StyledMagazineItemContainer>
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

const StyledCountText = styled.div`
    color: grey;
    font-size: 11px;
    margin-left: 3px;
`;

const StyledLikeButton = styled.img`
    cursor: pointer;
`;

const StyledStatBlock = styled.div`
    width: 25%;
    height: 100%;
    display: flex;
    margin-left: 1%;
    align-items: center;
`;

const StyledStatsBlock = styled.div`
    position: absolute;
    top: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 20%;
    background-color: white;
`;

const StyledImg = styled.img<{ imgAnim: any }>`
    cursor: pointer;
    object-fit: cover;
    animation: ${({ imgAnim }) => imgAnim} 0.2s;
    animation-fill-mode: forwards;
`;

const StyledImageBlock = styled.div`
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 80%;
`;

const StyledMagazineItemContainer = styled.div<{ width: string; height?: string; paddingBottom?: string }>`
    position: relative;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
`;

export default MyphotoItem;
