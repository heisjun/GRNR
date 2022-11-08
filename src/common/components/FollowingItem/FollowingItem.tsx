import { Avatar } from 'common/components';
import Slider from 'common/components/Slider';
import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { FaHeart, FaRegHeart, FaRegCommentDots, FaBookmark, FaRegBookmark, FaGratipay } from 'react-icons/fa';
import { IFollowingItem } from './FollowingItem.type';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { atom, useRecoilState, useSetRecoilState } from 'recoil';

const maxWidth = process.env.REACT_APP_MAX_WIDTH;

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const FollowingItem: React.FC<IFollowingItem> = (props) => {
    const { data } = props;
    const navigate = useNavigate();

    const likecountState = atom({
        key: `likecountState_${data.id}`,
        default: data.likeCount,
    });

    const ScrapcountState = atom({
        key: `ScrapcountState_${data.id}`,
        default: data.scrapCount,
    });

    const scrapExistState = atom({
        key: `scrapExistState_${data.id}`,
        default: data.myScrap,
    });

    const likeExistState = atom({
        key: `likeExistState_${data.id}`,
        default: data.myLike,
    });

    const [likeCount, setLikeCount] = useRecoilState(likecountState);
    const [scrapCount, setScrapCount] = useRecoilState(ScrapcountState);
    const [like, setLike] = useRecoilState(likeExistState);
    const [scrap, setScrap] = useRecoilState(scrapExistState);
    const setCountUseSetRecoilState = useSetRecoilState(likecountState);
    const setScrapCountUseSetRecoilState = useSetRecoilState(ScrapcountState);

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
                            <StyledTime> {data.time}</StyledTime>
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
                        {!like ? (
                            <FaRegHeart
                                onClick={() => {
                                    onPhotoLike();
                                    setLike(true);
                                    setCountUseSetRecoilState(likeCount + 1);
                                }}
                            />
                        ) : (
                            <FaHeart
                                onClick={() => {
                                    onPhotoLike();
                                    setLike(false);
                                    setCountUseSetRecoilState(likeCount - 1);
                                }}
                                style={{ color: 'red' }}
                            />
                        )}
                        <div>{likeCount}</div>
                    </StyledFooterItem>
                    <StyledFooterItem>
                        <FaRegCommentDots style={{ fontSize: '25' }} />
                        <div>{data.commentCount}</div>
                    </StyledFooterItem>
                    <StyledFooterItem>
                        {!scrap ? (
                            <FaRegBookmark
                                onClick={() => {
                                    onPhotoScrap();
                                    setScrap(true);
                                    setScrapCountUseSetRecoilState(scrapCount + 1);
                                }}
                            />
                        ) : (
                            <FaBookmark
                                onClick={() => {
                                    onPhotoScrap();
                                    setScrap(false);
                                    setScrapCountUseSetRecoilState(scrapCount - 1);
                                }}
                                style={{ color: '#0d6637' }}
                            />
                        )}
                        <div>{scrapCount}</div>
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
    width: 550px;
    height: 800px;
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
    padding: 3%;
    height: 4%;
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
    color: gray;
    font-size: 14px;
    font-weight: 400;
    padding-left: 10px;
    padding-right: 10px;
`;

const StyledClickText = styled.div<{ color: string }>`
    color: ${(props) => props.color};
    font-size: 14px;
    font-weight: 400;
`;

const StyledTime = styled.div`
    color: lightgray;
    font-size: 12px;
    padding-left: 10px;
    padding-right: 10px;
`;

const StyledHeaderItem2 = styled.div`
    display: flex;
    width: 20%;
    align-items: center;
    justify-content: space-between;
`;

const StyledBlockFooter = styled.div`
    height: 7.5%;
    display: flex;
    align-items: center;
`;

const StyledFooterItem = styled.div`
    display: flex;
    width: 33.3%;
    height: 55px;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    border-top: 1px solid gray;
    border-right: 0.5px solid gray;
`;

export default FollowingItem;
