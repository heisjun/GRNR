import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IMyphotoItem } from './MyphotoItem.type';
import { IItemParams } from 'common/types';

const MyphotoItem: React.FC<IMyphotoItem> = (props) => {
    const { width, height, paddingBottom, item } = props;

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
                <StyledImg src="/sample2.jpg" width="100%" height="100%" imgAnim={imgAnim} />
            </StyledImageBlock>
            <StyledStatsBlock>
                <StyledStatBlock>
                    <StyledStatsShape />
                    <StyledCountText>{item.like}</StyledCountText>
                </StyledStatBlock>
                <StyledStatBlock>
                    <StyledStatsShape />
                    <StyledCountText>{item.comment}</StyledCountText>
                </StyledStatBlock>
                <StyledStatBlock>
                    <StyledStatsShape />
                    <StyledCountText>{item.scrap}</StyledCountText>
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

const StyledStatsShape = styled.div`
    width: 40%;
    padding-bottom: 40%;
    border-radius: 40%;
    background-color: silver;
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
    border-radius: 5px;
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
    border-radius: 5px;
`;

export default MyphotoItem;
