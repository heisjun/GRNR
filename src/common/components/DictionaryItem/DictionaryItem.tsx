import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IItemParams } from 'common/types';

const DictionaryItem: React.FC<IItemParams> = (props) => {
    const { width, height, paddingBottom, item } = props;

    const [imgAnim, setImgAnim] = useState<any>();

    return (
        <StyledDictionaryItemContainer width={width} height={height} paddingBottom={paddingBottom}>
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

            <StyledTitleBlock>
                <StyledTitleText>라플레시아(Rafflesia)</StyledTitleText>
            </StyledTitleBlock>
        </StyledDictionaryItemContainer>
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

const StyledTitleText = styled.div`
    color: grey;
    font-size: 13px;
    margin-left: 2%;
`;

const StyledTitleBlock = styled.div`
    position: absolute;
    top: 85%;
    display: flex;
    align-items: center;
    width: 100%;
    height: 15%;
    background-color: white;
    border-radius: 0px 0px 5px 5px;
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
    height: 100%;
`;

const StyledDictionaryItemContainer = styled.div<{ width: string; height?: string; paddingBottom?: string }>`
    position: relative;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
    border: solid 2px;
    border-radius: 5px;
    border-color: grey;
    background-color: silver;
`;

export default DictionaryItem;
