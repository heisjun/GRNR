import styled from 'styled-components';
import { Avatar } from 'common/components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { followercountState, followingcountState } from 'recoil/count';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const UserProfile: React.FC = () => {
    interface IaccountDto {
        accountId: number;
        nickName: string;
        followerCount: number;
        followingCount: number;
        scrapCount: number;
        likeCount: number;
        profileUrl: string;
        selfInfo: string;
    }
    const navigate = useNavigate();
    const [accountDto, setAccountDto] = useState<IaccountDto>();
    const [followingCount, setFollowingCount] = useRecoilState(followingcountState);
    const [followerCount, setFollowerCount] = useRecoilState(followercountState);
    const [myFollow, setMyFollow] = useState<boolean>(); //팔로잉 수정해야함
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const myfeedData = await axios.get(`${BASEURL}/api/account/${localStorage.getItem('userId')}`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });

                setAccountDto(myfeedData.data.value.accountFeed);
                setMyFollow(myfeedData.data.value.myFollow);
                setFollowingCount(myfeedData.data.value.accountFeed.followingCount);
                setFollowerCount(myfeedData.data.value.accountFeed.followerCount);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [localStorage.getItem('userId')]);

    const onFollowing = async (followingName: string) => {
        if (!TOKEN) {
            navigate('/login');
        }
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
            setMyFollow(true);
        } catch (e) {
            console.log(e);
        }
    };

    const onUnFollowing = async (followingName: string) => {
        if (!TOKEN) {
            navigate('/login');
        }
        const followData = { followingName: followingName };
        const saveFollowDto = JSON.stringify(followData);

        try {
            await axios.post(`${BASEURL}/api/following/save`, saveFollowDto, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            setMyFollow(false);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <StyledProfileContainer>
                <StyledAvatarBlock>
                    <Avatar width="100%" paddingBottom="100%" borderRadius="100%" picUrl={accountDto?.profileUrl} />
                </StyledAvatarBlock>
                <StyledNameText>{accountDto?.nickName}</StyledNameText>
                <StyledIntroText>{accountDto?.selfInfo}</StyledIntroText>
                <div style={{ display: 'flex' }}>
                    <StyledFollowText onClick={() => navigate(`/userpage/follower/${accountDto?.accountId}`)}>
                        팔로워 <span>{followingCount}</span>
                    </StyledFollowText>
                    <StyledFollowText onClick={() => navigate(`/userpage/following/${accountDto?.accountId}`)}>
                        팔로잉 <span>{followerCount}</span>
                    </StyledFollowText>
                </div>
                {myFollow ? (
                    <StyledFollowingButtonBlock>
                        <span onClick={() => onUnFollowing(accountDto?.nickName ? accountDto.nickName : '')}>
                            팔로잉
                        </span>
                    </StyledFollowingButtonBlock>
                ) : (
                    <StyledFollowButtonBlock>
                        <span onClick={() => onFollowing(accountDto?.nickName ? accountDto.nickName : '')}>팔로우</span>
                    </StyledFollowButtonBlock>
                )}
            </StyledProfileContainer>
            <div style={{ marginBottom: 100 }}>
                <StyledFeedNav
                    nav={location.pathname === `/userpage/${accountDto?.accountId}` ? true : false}
                    onClick={() => navigate(`/userpage/${accountDto?.accountId}`)}
                >
                    모두보기
                </StyledFeedNav>
                <StyledFeedNav
                    nav={location.pathname === `/userpage/photo/${accountDto?.accountId}` ? true : false}
                    onClick={() => navigate(`/userpage/photo/${accountDto?.accountId}`)}
                >
                    사진
                </StyledFeedNav>
                <StyledFeedNav
                    nav={location.pathname === `/userpage/magazine/${accountDto?.accountId}` ? true : false}
                    onClick={() => navigate(`/userpage/magazine/${accountDto?.accountId}`)}
                >
                    매거진
                </StyledFeedNav>
                <StyledFeedNav
                    nav={location.pathname === `/userpage/question/${accountDto?.accountId}` ? true : false}
                    onClick={() => navigate(`/userpage/question/${accountDto?.accountId}`)}
                >
                    Q&A
                </StyledFeedNav>
                <StyledFeedNav
                    nav={
                        location.pathname === `/userpage/scrapbook/${accountDto?.accountId}` ||
                        location.pathname === `/userpage/scrapbook/photo/${accountDto?.accountId}` ||
                        location.pathname === `/userpage/scrapbook/magazine/${accountDto?.accountId}` ||
                        location.pathname === `/userpage/scrapbook/dictionary/${accountDto?.accountId}`
                            ? true
                            : false
                    }
                    onClick={() => navigate(`/userpage/scrapbook/${accountDto?.accountId}`)}
                >
                    스크랩북
                </StyledFeedNav>
            </div>
        </div>
    );
};

const StyledFollowButtonBlock = styled.div`
    margin-top: 26px;
    margin-bottom: 26px;
    height: 34px;
    box-sizing: border-box;
    padding: 7px 17px;
    border-radius: 17px;
    background-color: #fff;
    border: 1px solid #0d6637;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span {
        font-family: NotoSansKR;
        font-size: 13px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #0d6637;
    }
`;

const StyledFollowingButtonBlock = styled.div`
    margin-top: 26px;
    margin-bottom: 26px;
    height: 34px;
    box-sizing: border-box;
    padding: 7px 17px;
    border-radius: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0d6637;
    cursor: pointer;
    span {
        font-family: NotoSansKR;
        font-size: 13px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #fff;
    }
`;

const StyledFeedNav = styled.div<{ nav?: boolean }>`
    box-sizing: border-box;
    width: 280px;
    height: 60px;
    padding: 18px 0px 18px 14px;
    font-size: 16px;
    font-weight: 500;
    color: ${({ nav }) => (nav ? '#0d6637;' : '#272727')};
    background-color: ${({ nav }) => (nav ? '#e7f5ee;' : 'white')};
    cursor: pointer;
`;

const StyledFollowText = styled.div`
    margin-top: 11px;
    margin-right: 8px;
    margin-left: 8px;
    font-family: NotoSansKR;
    font-size: 13px;
    color: #787878;
    cursor: pointer;
    span {
        padding: 0px 3px;
        font-weight: bold;
        color: #0d6637;
    }
`;

const StyledIntroText = styled.div`
    margin-top: 12px;
    font-family: NotoSansKR;
    font-size: 14px;
    color: #818181;
`;

const StyledNameText = styled.div`
    margin-top: 17px;
    font-family: NotoSansKR;
    font-size: 18px;
    font-weight: bold;
    color: #272727;
`;

const StyledAvatarBlock = styled.div`
    width: 140px;
    height: 140px;
    margin-top: 40px;
`;

const StyledProfileContainer = styled.div`
    box-sizing: border-box;
    width: 280px;
    height: 365px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid 1px #dbdbdb;
    background-color: #fff;
    margin-bottom: 40px;
`;

export default UserProfile;
