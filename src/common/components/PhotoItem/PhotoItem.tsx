import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IPhotoDetailsParams, IPhotoItemParams } from 'common/types';
import { Avatar } from 'common/components';
import axios from 'axios';
import Modal from 'react-modal';
import PhotoItemModal from '../PhotoItemModal';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const PhotoItem: React.FC<IPhotoItemParams> = (props) => {
    const navigate = useNavigate();
    const { width, height, paddingBottom, item, setFunc, items } = props;
    const [hover, setHover] = useState<boolean>(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const dropdownListRef = useRef<any>(null);

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

    const onPhotoLike = async () => {
        if (!TOKEN) {
            navigate('/login');
        } else {
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
        }
    };

    const onPhotoUnLike = async () => {
        if (!TOKEN) {
            navigate('/login');
        } else {
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
        }
    };

    const onPhotoScrap = async () => {
        if (!TOKEN) {
            navigate('/login');
        } else {
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
                        it.pictureId === item.pictureId
                            ? { ...it, myScrap: true, scrapCount: item.scrapCount + 1 }
                            : it,
                    ),
                );
            } catch (e) {
                console.log(e);
            }
        }
    };

    const onPhotoUnScrap = async () => {
        if (!TOKEN) {
            navigate('/login');
        } else {
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
                        it.pictureId === item.pictureId
                            ? { ...it, myScrap: false, scrapCount: item.scrapCount - 1 }
                            : it,
                    ),
                );
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <>
            <StyledPhotoItemContainer width={width} height={height} paddingBottom={paddingBottom}>
                <Modal isOpen={isOpenModal} ariaHideApp={false} style={customStyles}>
                    <div ref={dropdownListRef}>
                        <PhotoItemModal
                            setIsOpenModal={setIsOpenModal}
                            pictureId={item.pictureId ? item.pictureId : 1}
                            ref={dropdownListRef}
                        />
                    </div>
                </Modal>
                <StyledPhotoBlock
                    onMouseEnter={() => {
                        setHover(true);
                    }}
                    onMouseLeave={() => {
                        setHover(false);
                    }}
                >
                    {hover && (
                        <StyledHoverBackgrouond onClick={() => setIsOpenModal(true)}>
                            <StyledProfileBlock>
                                <StyledAvatarBlock>
                                    <Avatar
                                        width="100%"
                                        paddingBottom="100%"
                                        borderRadius="100%"
                                        picUrl={item.accountProfileUrl}
                                    />
                                </StyledAvatarBlock>
                                <StyledNicknameBlock>{item.accountNickName}</StyledNicknameBlock>
                            </StyledProfileBlock>
                            <StyledBorderLine />
                            <StyledDetailsText>{item.firstContent.explain}</StyledDetailsText>
                        </StyledHoverBackgrouond>
                    )}

                    <StyledImg src={item.firstContent.pictureUrl} width="100%" height="100%" />
                </StyledPhotoBlock>

                <StyledFooterBlock>
                    <StyledButtonsBlock>
                        {!item.myLike ? (
                            <StyledButtonContent
                                onClick={() => {
                                    onPhotoLike();
                                }}
                            >
                                <StyledIcon src="/btnBlankHeart.png" />
                                <StyledText>{item.likeCount}</StyledText>
                            </StyledButtonContent>
                        ) : (
                            <StyledButtonContent
                                onClick={() => {
                                    onPhotoUnLike();
                                }}
                            >
                                <StyledIcon src="/btnHeart.png" style={{ color: 'red' }} />
                                <StyledText>{item.likeCount}</StyledText>
                            </StyledButtonContent>
                        )}

                        <StyledButtonContent>
                            <StyledIcon src="/btnComment.png" />
                            <StyledText>{item.commentCount}</StyledText>
                        </StyledButtonContent>

                        {!item.myScrap ? (
                            <StyledButtonContent
                                onClick={() => {
                                    onPhotoScrap();
                                }}
                            >
                                <StyledIcon src="/btnBlankBookmark.png" />
                                <StyledText>{item.scrapCount}</StyledText>
                            </StyledButtonContent>
                        ) : (
                            <StyledButtonContent
                                onClick={() => {
                                    onPhotoUnScrap();
                                }}
                            >
                                <StyledIcon src="/btnBookmark.png" style={{ color: '#0d6637' }} />
                                <StyledText>{item.scrapCount}</StyledText>
                            </StyledButtonContent>
                        )}
                    </StyledButtonsBlock>
                </StyledFooterBlock>
            </StyledPhotoItemContainer>
        </>
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

const StyledIcon = styled.img`
    width: 20px;
    height: 20px;
    margin-right: 12px;
    cursor: pointer;
`;

const StyledButtonContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 122px;
    height: 54px;
`;

const StyledBorderLine = styled.div`
    margin-left: 3%;
    margin-right: 3%;
    margin-top: 16px;
    margin-bottom: 16px;
    border-bottom: solid 1px;
    border-color: #ececec;
    opacity: 0.34;
`;
const StyledHoverBackgrouond = styled.div`
    background-color: rgb(0, 0, 0, 0.45);
    position: absolute;
    width: 100%;
    height: 366px;
    z-index: 1;
`;

const StyledProfileBlock = styled.div`
    display: flex;
    padding: 10px;
    margin-top: 55%;
    align-items: center;
`;

const StyledAvatarBlock = styled.div`
    width: 40px;
    position: relative;
    z-index: 20;
    padding-right: 14px;
`;

const StyledNicknameBlock = styled.div`
    font-family: NotoSansKR;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #fff;
`;
const StyledText = styled.div`
    font-size: 15;
    font-weight: 400;
    color: gray;
`;

const StyledDetailsText = styled.div`
    margin: 0px 0 78px 16px;
    font-family: NotoSansKR;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.53;
    letter-spacing: normal;
    color: #fff;
`;

const StyledButtonsBlock = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: white;
`;

const StyledImg = styled.img`
    object-fit: cover;
`;

const StyledPhotoBlock = styled.div`
    position: absolute;
    width: 366px;
    height: 366px;
    background-color: silver;
    overflow: hidden;
    cursor: pointer;
`;

const StyledFooterBlock = styled.div`
    position: absolute;
    top: 366px;
    height: 54px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
`;

const StyledPhotoItemContainer = styled.div<{ width: string; height?: string; paddingBottom?: string }>`
    position: relative;
    width: 366px;
    height: 420px;
    margin-bottom: 38px;
`;

export default PhotoItem;
