import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IDictionaryItem } from 'common/types';
import { Link } from 'react-router-dom';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

const maxWidth = process.env.REACT_APP_MAX_WIDTH;

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
                    <div>
                        <StyledEngTitleText>{item.scientificName}</StyledEngTitleText>
                        <StyledTitleText>{item.plantName}</StyledTitleText>
                    </div>
                    <StyledIcon src={'/btnBlankBookmark.png'} />
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

const StyledIcon = styled.img`
    width: 30px;
    height: 30px;
`;
const StyledEngTitleText = styled.div`
    font-family: NotoSansKR;
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 6px;
    color: #919191;
`;
const StyledTitleText = styled.div`
    font-family: NotoSansKR;
    font-size: 20px;
    font-weight: bold;
    color: #272727;
`;

const StyledTitleBlock = styled.div`
    position: absolute;
    top: 89%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 15%;
    padding-right: 5px;
    box-sizing: border-box;
    background-color: white;
    @media screen and (min-width: ${maxWidth}px) {
        top: 83%;
    }
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
    @media screen and (min-width: ${maxWidth}px) {
        width: 366px;
        height: 368px;
    }
`;

const StyledDictionaryItemContainer = styled.div<{ width: string; height?: string; paddingBottom?: string }>`
    position: relative;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
    @media screen and (min-width: ${maxWidth}px) {
        width: 366px;
        height: 463px;
        padding-bottom: 0%;
    }
`;

export default DictionaryItem;
