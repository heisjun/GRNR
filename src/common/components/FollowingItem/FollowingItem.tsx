import { Avatar } from 'common/components';
import Slider from 'common/components/Slider';
import React from 'react';
import styled from 'styled-components';
import { IFollowingItem } from './FollowingItem.type';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const maxWidth = process.env.REACT_APP_MAX_WIDTH;

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const FollowingItem: React.FC<IFollowingItem> = (props) => {
    const { data, setFunc, items } = props;
    const navigate = useNavigate();

    const onPhotoLike = async () => {
        if (!TOKEN) {
            navigate('/login');
        } else {
            try {
                await axios.post(
                    `${BASEURL}/api/picture/${data.id}/like`,
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
                        it.id === data.id ? { ...it, myLike: true, likeCount: data.likeCount + 1 } : it,
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
                    `${BASEURL}/api/picture/${data.id}/like`,
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
                        it.id === data.id ? { ...it, myLike: false, likeCount: data.likeCount - 1 } : it,
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
                    `${BASEURL}/api/picture/${data.id}/scrap`,
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
                        it.id === data.id ? { ...it, myScrap: true, scrapCount: data.scrapCount + 1 } : it,
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
                    `${BASEURL}/api/picture/${data.id}/scrap`,
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
                        it.id === data.id ? { ...it, myScrap: false, scrapCount: data.scrapCount - 1 } : it,
                    ),
                );
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <StyledFollowingFeeds>
            <StyledFeedsBlock>
                <StyledBlockHeader>
                    <StyledHeaderItem>
                        <Avatar width="9%" paddingBottom="9%" borderRadius="100%" picUrl={data.accountProfileUrl} />
                        <div>
                            <StyledNickname> {data.accountNickName}</StyledNickname>
                            <StyledTime> {data.createTime}</StyledTime>
                        </div>
                    </StyledHeaderItem>
                    <StyledHeaderItem2>
                        <StyledClickText color="lightgray">신고</StyledClickText>
                        <StyledClickText color="gray">팔로우</StyledClickText>
                    </StyledHeaderItem2>
                </StyledBlockHeader>
                <Slider item={data} />
                <StyledBlockFooter>
                    <StyledFooterItem>
                        {!data.myLike ? (
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
                        <div>{data.likeCount}</div>
                    </StyledFooterItem>
                    <StyledFooterCenterItem>
                        <StyledIcon src="/btnComment.png" />
                        <div>{data.commentCount}</div>
                    </StyledFooterCenterItem>
                    <StyledFooterItem>
                        {!data.myScrap ? (
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
                        <div>{data.scrapCount}</div>
                    </StyledFooterItem>
                </StyledBlockFooter>
            </StyledFeedsBlock>
        </StyledFollowingFeeds>
    );
};

const StyledFollowingFeeds = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledFeedsBlock = styled.div`
    width: 720px;
    height: 885px;
    margin-bottom: 40px;
    background-color: white;
    @media screen and (min-width: ${maxWidth}px) {
        width: 720px;
        height: 885px;
    }
`;

const StyledBlockHeader = styled.div`
    box-sizing: border-box;
    display: flex;
    padding: 16px 24px;
    height: 80px;
    @media screen and (min-width: ${maxWidth}px) {
        padding: 16px 24px;
        height: 80px;
    }
`;

const StyledHeaderItem = styled.div`
    display: flex;
    width: 80%;
    align-items: center;
`;

const StyledNickname = styled.div`
    margin: 0 0px 2px 14px;
    font-family: NotoSansKR;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #272727;
`;

const StyledClickText = styled.div<{ color: string }>`
    color: ${(props) => props.color};
    font-size: 14px;
    font-weight: 400;
    margin-left: 10px;
`;

const StyledTime = styled.div`
    color: lightgray;
    font-size: 12px;
    margin: 0 0px 2px 14px;
`;

const StyledHeaderItem2 = styled.div`
    width: 20%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const StyledBlockFooter = styled.div`
    height: 70px;
    display: flex;
    align-items: center;
    @media screen and (min-width: ${maxWidth}px) {
        height: 70px;
    }
`;

const StyledFooterItem = styled.div`
    box-sizing: border-box;
    display: flex;
    width: 240px;
    height: 70px;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    border-top: 1px solid #ececec;

    @media screen and (min-width: ${maxWidth}px) {
        width: 240px;
        height: 70px;
    }
`;
const StyledFooterCenterItem = styled.div`
    box-sizing: border-box;
    display: flex;
    width: 240px;
    height: 70px;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    border-top: 1px solid #ececec;
    border-right: 1px solid #ececec;
    border-left: 1px solid #ececec;
    @media screen and (min-width: ${maxWidth}px) {
        width: 240px;
        height: 70px;
    }
`;

const StyledIcon = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
`;

export default FollowingItem;
