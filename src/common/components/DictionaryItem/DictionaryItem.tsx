import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IDictionaryItem, IItemParams } from 'common/types';
import { Link } from 'react-router-dom';

const DictionaryItem: React.FC<IDictionaryItem> = (props) => {
    const { width, height, paddingBottom, item } = props;

    const [imgAnim, setImgAnim] = useState<any>();

    return (
        <Link to={`./details/${item.plantDicId}`} style={{ textDecoration: 'none' }}>
            <StyledDictionaryItemContainer width={width} height={height} paddingBottom={paddingBottom}>
                <StyledImageBlock
                    onMouseEnter={() => {
                        setImgAnim(ImageScaleUp);
                    }}
                    onMouseLeave={() => {
                        setImgAnim(ImageScaleDown);
                    }}
                >
                    <StyledImg src={item.plantPicUrl} width="100%" height="100%" imgAnim={imgAnim} />
                </StyledImageBlock>

                <StyledTitleBlock>
                    <StyledTitleText>{item.plantName}</StyledTitleText>
                </StyledTitleBlock>
            </StyledDictionaryItemContainer>
        </Link>
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
    border: solid 1px;
    border-color: grey;
    background-color: silver;
`;

export default DictionaryItem;
