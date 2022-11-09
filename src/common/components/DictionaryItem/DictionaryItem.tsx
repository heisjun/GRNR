import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IDictionaryItem } from 'common/types';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import axios from 'axios';

const maxWidth = process.env.REACT_APP_MAX_WIDTH;

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const DictionaryItem: React.FC<IDictionaryItem> = (props) => {
    const navigate = useNavigate();
    const { width, height, paddingBottom, item, setFunc, items } = props;

    const [imgAnim, setImgAnim] = useState<any>();

    const onPhotoScrap = async () => {
        if (!TOKEN) {
            navigate('/login');
        } else {
            try {
                await axios.post(
                    `${BASEURL}/api/images/${item.plantDicId}/scrap`,
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${TOKEN}`,
                        },
                    },
                );

                setFunc(
                    items.map((it) => (it.plantDicId === item.plantDicId ? { ...it, myScrap: !item.myScrap } : it)),
                );
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <StyledDictionaryItemContainer width={width} height={height} paddingBottom={paddingBottom}>
            <Link to={`./details/${item.plantDicId}`} style={{ textDecoration: 'none' }}>
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
            </Link>

            <StyledTitleBlock>
                <div>
                    <StyledEngTitleText>{item.scientificName}</StyledEngTitleText>
                    <StyledTitleText>{item.plantName}</StyledTitleText>
                </div>
                {item.myScrap ? (
                    <StyledIcon src={'/btnBookmark.png'} onClick={() => onPhotoScrap()} />
                ) : (
                    <StyledIcon src={'/btnBlankBookmark.png'} onClick={() => onPhotoScrap()} />
                )}
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
