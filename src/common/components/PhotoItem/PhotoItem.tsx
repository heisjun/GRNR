import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { IPhotoItemParams } from 'common/types';
import { Avatar } from 'common/components';
import axios from 'axios';
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark, FaRegCommentDots } from 'react-icons/fa';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const PhotoItem: React.FC<IPhotoItemParams> = (props) => {
    const navigate = useNavigate();
    const { width, height, paddingBottom, item } = props;
    const [imgAnim, setImgAnim] = useState<any>();
    const [hover, setHover] = useState<boolean>(false);
    const [like, setLike] = useState(item.myLike);
    const [likeCount, setLikeCount] = useState<any>(item.likeCount);
    const [scrap, setScrap] = useState(item.myScrap);
    const [scrapCount, setScrapCount] = useState<any>(item.scrapCount);

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
                setLike(true);
                setLikeCount(likeCount + 1);
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
                setLike(false);
                setLikeCount(likeCount - 1);
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
                setScrap(true);
                setScrapCount(scrapCount + 1);
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
                setScrap(false);
                setScrapCount(scrapCount - 1);
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

                    <StyledImg src={item.firstContent.pictureUrl} width="100%" height="100%" imgAnim={imgAnim} />
                </StyledPhotoBlock>

                <StyledFooterBlock>
                    <StyledButtonsBlock>
                        {!like ? (
                            <FaRegHeart
                                onClick={() => {
                                    onPhotoLike();
                                }}
                            />
                        ) : (
                            <FaHeart
                                onClick={() => {
                                    onPhotoUnLike();
                                }}
                                style={{ color: 'red' }}
                            />
                        )}
                        <StyledText>{likeCount ? likeCount : item.likeCount}</StyledText>
                        <FaRegCommentDots />
                        <StyledText>{item.commentCount}</StyledText>
                        {!scrap ? (
                            <FaRegBookmark onClick={onPhotoScrap} />
                        ) : (
                            <FaBookmark onClick={onPhotoUnScrap} style={{ color: '#0d6637' }} />
                        )}
                        <StyledText>{scrapCount}</StyledText>
                    </StyledButtonsBlock>
                </StyledFooterBlock>
            </StyledPhotoItemContainer>
        </>
    );
};

const StyledBorderLine = styled.div`
    margin-left: 5%;
    margin-right: 5%;
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
    width: 15%;
    position: relative;
    z-index: 20;
    padding-right: 14px;
`;

const StyledNicknameBlock = styled.div`
    color: white;
    font-size: 16px;
    font-weight: 500;
`;
const StyledText = styled.div`
    font-size: 15;
    font-weight: 400;
    color: gray;
`;

const StyledLikeButton = styled.img`
    cursor: pointer;
`;

const StyledDetailsText = styled.div`
    font-size: 15px;
    font-weight: 400;
    color: white;
    padding-left: 10px;
`;

const StyledButtonsBlock = styled.div`
    width: 100%;
    height: 45%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: white;
`;

const StyledImg = styled.img<{ imgAnim: any }>`
    cursor: pointer;
    animation: ${({ imgAnim }) => imgAnim} 0.2s;
    animation-fill-mode: forwards;
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
