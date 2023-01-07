import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IDicData, IDictionariesParams, IDictionaryItem } from 'common/types';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import axios from 'axios';

const maxWidth = process.env.REACT_APP_MAX_WIDTH;

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

interface IScrapDictionary {
    width: string;
    height?: string | undefined;
    paddingBottom?: string | undefined;
    setFunc: any;
    items: IDicData[];
    item: IDicData;
}

const ScrapDictionaryItem: React.FC<IScrapDictionary> = (props) => {
    const navigate = useNavigate();
    const { width, height, paddingBottom, item, items } = props;

    const [imgAnim, setImgAnim] = useState<any>();

    return (
        <StyledDictionaryItemContainer width={width} height={height} paddingBottom={paddingBottom}>
            <Link to={`/community/dictionary/details/${item.dictionaryId}`} style={{ textDecoration: 'none' }}>
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
            </Link>

            <StyledTitleBlock>
                <div>
                    <StyledEngTitleText>{item.engName}</StyledEngTitleText>
                    <StyledTitleText>{item.korName}</StyledTitleText>
                </div>
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

const StyledEngTitleText = styled.div`
    font-family: NotoSansKR;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 6px;
    color: #919191;
`;
const StyledTitleText = styled.div`
    font-family: NotoSansKR;
    font-size: 18px;
    font-weight: bold;
    color: #272727;
`;

const StyledTitleBlock = styled.div`
    position: absolute;
    top: 83%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 15%;
    padding-right: 5px;
    box-sizing: border-box;
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
    width: 252px;
    height: 252px;
`;

const StyledDictionaryItemContainer = styled.div<{ width: string; height?: string; paddingBottom?: string }>`
    position: relative;
    width: 252px;
    height: 340px;
    padding-bottom: 0%;
`;

export default ScrapDictionaryItem;
