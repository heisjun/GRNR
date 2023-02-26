import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { IMyfeedItemParams } from 'common/types';
import Modal from 'react-modal';
import PhotoItemModal from '../PhotoItemModal';
import axios from 'axios';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const UserfeedItem: React.FC<IMyfeedItemParams> = (props) => {
    const { width, height, paddingBottom, item, items, setFunc } = props;
    const [isOpenModal, setIsOpenModal] = useState(false);
    const dropdownListRef = useRef<any>(null);

    const [imgAnim, setImgAnim] = useState<any>();

    useEffect(() => {
        function handleClickOutside(e: MouseEvent): void {
            if (dropdownListRef.current && !dropdownListRef.current.contains(e.target as Node)) {
                setIsOpenModal(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownListRef]);

    const navigate = useNavigate();
    const onPhotoLike = async () => {
        try {
            await axios.post(
                `${BASEURL}/api/picture/${item.pictureId}/like`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TOKEN}`,
                    },
                },
            );
            setFunc(
                items.map((it) =>
                    it.pictureId === item.pictureId ? { ...it, myLike: true, likeCount: item.likeCount + 1 } : it,
                ),
            );
        } catch (e) {
            console.log(e);
        }
    };

    const onPhotoUnLike = async () => {
        try {
            await axios.post(
                `${BASEURL}/api/picture/${item.pictureId}/like`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TOKEN}`,
                    },
                },
            );
            setFunc(
                items.map((it) =>
                    it.pictureId === item.pictureId ? { ...it, myLike: false, likeCount: item.likeCount - 1 } : it,
                ),
            );
        } catch (e) {
            console.log(e);
        }
    };

    const onPhotoScrap = async () => {
        try {
            await axios.post(
                `${BASEURL}/api/picture/${item.pictureId}/scrap`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TOKEN}`,
                    },
                },
            );
            setFunc(
                items.map((it) =>
                    it.pictureId === item.pictureId ? { ...it, myScrap: true, scrapCount: item.scrapCount + 1 } : it,
                ),
            );
        } catch (e) {
            console.log(e);
        }
    };

    const onPhotoUnScrap = async () => {
        try {
            await axios.post(
                `${BASEURL}/api/picture/${item.pictureId}/scrap`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TOKEN}`,
                    },
                },
            );
            setFunc(
                items.map((it) =>
                    it.pictureId === item.pictureId ? { ...it, myScrap: false, scrapCount: item.scrapCount - 1 } : it,
                ),
            );
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <StyledTodaysPhotoContainer width={width} height={height} paddingBottom={paddingBottom}>
            <Modal isOpen={isOpenModal} ariaHideApp={false} style={customStyles}>
                <div ref={dropdownListRef}>
                    <PhotoItemModal setIsOpenModal={setIsOpenModal} pictureId={item.pictureId} ref={dropdownListRef} />
                </div>
            </Modal>

            <StyledImgBlock
                onMouseEnter={() => {
                    setImgAnim(ImageScaleUp);
                }}
                onMouseLeave={() => {
                    setImgAnim(ImageScaleDown);
                }}
                onClick={() => {
                    setIsOpenModal(true);
                }}
            >
                {item.video ? (
                    <StyledVideo src={item.pictureUrl} width="100%" height="100%" />
                ) : (
                    <StyledImg src={item.pictureUrl} width="100%" height="100%" imgAnim={imgAnim} />
                )}
            </StyledImgBlock>
            <StyledStatsBlock>
                <StyledStatBlock>
                    {!item.myLike ? (
                        <StyledButtonContent
                            onClick={() => {
                                onPhotoLike();
                            }}
                        >
                            <StyledLikeButton src="/btnBlankHeart.png" />
                            <StyledCountText>{item.likeCount}</StyledCountText>
                        </StyledButtonContent>
                    ) : (
                        <StyledButtonContent
                            onClick={() => {
                                onPhotoUnLike();
                            }}
                        >
                            <StyledLikeButton src="/btnHeart.png" style={{ color: 'red' }} />
                            <StyledCountText>{item.likeCount}</StyledCountText>
                        </StyledButtonContent>
                    )}
                </StyledStatBlock>
                <StyledStatBlock
                    onClick={() => {
                        setIsOpenModal(true);
                    }}
                >
                    <StyledLikeButton src={'/btnComment.png'} />
                    <StyledCountText>{item.commentCount}</StyledCountText>
                </StyledStatBlock>
                <StyledStatBlock>
                    {!item.myScrap ? (
                        <StyledButtonContent
                            onClick={() => {
                                onPhotoScrap();
                            }}
                        >
                            <StyledLikeButton src="/btnBlankBookmark.png" />
                            <StyledCountText>{item.scrapCount}</StyledCountText>
                        </StyledButtonContent>
                    ) : (
                        <StyledButtonContent
                            onClick={() => {
                                onPhotoUnScrap();
                            }}
                        >
                            <StyledLikeButton src="/btnBookmark.png" style={{ color: '#0d6637' }} />
                            <StyledCountText>{item.scrapCount}</StyledCountText>
                        </StyledButtonContent>
                    )}
                </StyledStatBlock>
            </StyledStatsBlock>
        </StyledTodaysPhotoContainer>
    );
};

const customStyles = {
    overlay: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: '100px',
        width: '1140px',
        height: '750px',
        padding: '0',
        overflow: 'hidden',
        borderRadius: '0px',
    },
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

const StyledButtonContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
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

export default UserfeedItem;
