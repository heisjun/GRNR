import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { IMyphotoItem } from './MyphotoItem.type';

const MyphotoItem: React.FC<IMyphotoItem> = (props) => {
    const { width, height, paddingBottom, item } = props;

    const [imgAnim, setImgAnim] = useState<any>();

    return (
        <StyledMagazineItemContainer width={width} height={height} paddingBottom={paddingBottom}>
            <Link to={`/community/photo/details/${item.pictureId}`} style={{ textDecoration: 'none' }}>
                <StyledImageBlock
                    onMouseEnter={() => {
                        setImgAnim(ImageScaleUp);
                    }}
                    onMouseLeave={() => {
                        setImgAnim(ImageScaleDown);
                    }}
                >
                    {item.video ? (
                        <StyledVideo src={item.pictureUrl} width="100%" height="100%" />
                    ) : (
                        <StyledImg src={item.pictureUrl} width="100%" height="100%" imgAnim={imgAnim} />
                    )}
                </StyledImageBlock>
                <StyledStatsBlock>
                    <StyledStatBlock>
                        <StyledLikeButton src={'/btnBlankHeart.png'} />
                        <StyledCountText>{item.likeCount}</StyledCountText>
                    </StyledStatBlock>
                    <StyledStatBlock>
                        <StyledLikeButton src={'/btnComment.png'} />
                        <StyledCountText>{item.commentCount}</StyledCountText>
                    </StyledStatBlock>
                    <StyledStatBlock>
                        <StyledLikeButton src={'/btnBlankBookmark.png'} />
                        <StyledCountText>{item.scrapCount}</StyledCountText>
                    </StyledStatBlock>
                </StyledStatsBlock>
            </Link>
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
    font-size: 14px;
    margin-left: 8px;
    color: #4d4d4d;
`;

const StyledLikeButton = styled.img`
    cursor: pointer;
    width: 20px;
    height: 20px;
`;

const StyledStatBlock = styled.div`
    display: flex;
    align-items: center;
`;

const StyledStatsBlock = styled.div`
    position: absolute;
    top: 184px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 56px;
    background-color: white;
`;

const StyledImg = styled.img<{ imgAnim: any }>`
    cursor: pointer;
    object-fit: cover;
    animation: ${({ imgAnim }) => imgAnim} 0.2s;
    animation-fill-mode: forwards;
`;

const StyledVideo = styled.video`
    cursor: pointer;
    object-fit: cover;
`;

const StyledImageBlock = styled.div`
    position: absolute;
    overflow: hidden;
    width: 184px;
    height: 184px;
`;

const StyledMagazineItemContainer = styled.div<{ width: string; height?: string; paddingBottom?: string }>`
    position: relative;
    width: 184px;
    height: 240px;
`;

export default MyphotoItem;
