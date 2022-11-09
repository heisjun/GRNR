import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IPhotoItemParams } from 'common/types';
import { Avatar } from 'common/components';
import axios from 'axios';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const PhotoItem: React.FC<IPhotoItemParams> = (props) => {
    const navigate = useNavigate();
    const { width, height, paddingBottom, item, setFunc, items } = props;
    const [hover, setHover] = useState<boolean>(false);

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

    const onFollowing = async (followingName: string) => {
        if (!TOKEN) {
            navigate('/login');
        } else {
            const followData = { followingName: followingName };
            const saveFollowDto = JSON.stringify(followData);
            console.log(saveFollowDto);
            try {
                await axios.post(`${BASEURL}/api/following/save`, saveFollowDto, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });
            } catch (e) {
                console.log(e);
            }
        }
    };

    const onGoUser = () => {
        sessionStorage.setItem('userId', String(item?.accountId));
        navigate(`/userpage/${item.accountId}`);
    };

    return (
        <>
            <StyledPhotoItemContainer width={width} height={height} paddingBottom={paddingBottom}>
                <StyledPhotoBlock
                    onMouseEnter={() => {
                        setHover(true);
                    }}
                    onMouseLeave={() => {
                        setHover(false);
                    }}
                >
                    {hover && (
                        <StyledHoverBackgrouond onClick={() => navigate(`./details/${item.pictureId}`)}>
                            <StyledProfileBlock>
                                <StyledAvatarBlock onClick={onGoUser}>
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
                            <StyledIcon
                                src="/btnBlankHeart.png"
                                onClick={() => {
                                    onPhotoLike();
                                }}
                            />
                        ) : (
                            <StyledIcon
                                src="/btnHeart.png"
                                onClick={() => {
                                    onPhotoUnLike();
                                }}
                                style={{ color: 'red' }}
                            />
                        )}
                        <StyledText>{item.likeCount}</StyledText>
                        <StyledIcon src="/btnComment.png" />
                        <StyledText>{item.commentCount}</StyledText>
                        {!item.myScrap ? (
                            <StyledIcon
                                src="/btnBlankBookmark.png"
                                onClick={() => {
                                    onPhotoScrap();
                                }}
                            />
                        ) : (
                            <StyledIcon
                                src="/btnBookmark.png"
                                onClick={() => {
                                    onPhotoUnScrap();
                                }}
                                style={{ color: '#0d6637' }}
                            />
                        )}
                        <StyledText>{item.scrapCount}</StyledText>
                    </StyledButtonsBlock>
                </StyledFooterBlock>
            </StyledPhotoItemContainer>
        </>
    );
};

const StyledIcon = styled.img`
    width: 20px;
    height: 20px;
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
    height: 92.5%;
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
    height: 45%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: white;
`;

const StyledImg = styled.img`
    cursor: pointer;

    object-fit: cover;
`;

const StyledPhotoBlock = styled.div`
    position: absolute;
    top: 8%;
    width: 100%;
    height: 90%;
    background-color: silver;
    overflow: hidden;
`;

const StyledFooterBlock = styled.div`
    position: absolute;
    top: 91.5%;
    height: 30%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
`;

const StyledPhotoItemContainer = styled.div<{ width: string; height?: string; paddingBottom?: string }>`
    position: relative;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    padding-bottom: ${({ paddingBottom }) => paddingBottom};
`;

export default PhotoItem;
