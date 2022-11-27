import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { IMyfeedItemParams } from 'common/types';
import { Avatar } from 'common/components';

const maxWidth = Number(process.env.REACT_APP_MAX_WIDTH) + 100;
const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const MyfeedItem: React.FC<IMyfeedItemParams> = (props) => {
    const { width, height, paddingBottom, item } = props;

    const [imgAnim, setImgAnim] = useState<any>();

    return (
        <StyledTodaysPhotoContainer width={width} height={height} paddingBottom={paddingBottom}>
            <Link to={`/community/photo/details/${item.pictureId}`} style={{ textDecoration: 'none' }}>
                <StyledImgBlock
                    onMouseEnter={() => {
                        setImgAnim(ImageScaleUp);
                    }}
                    onMouseLeave={() => {
                        setImgAnim(ImageScaleDown);
                    }}
                >
                    <StyledImg src={item.pictureUrl} width="100%" height="100%" imgAnim={imgAnim} />
                </StyledImgBlock>
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
        </StyledTodaysPhotoContainer>
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

const StyledImgBlock = styled.div`
    overflow: hidden;
    width: 184px;
    height: 184px;
    box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.06);
`;

const StyledTodaysPhotoContainer = styled.div<{ width: string; height?: string; paddingBottom?: string }>`
    position: relative;
    width: 184px;
    height: 240px;
`;

export default MyfeedItem;
