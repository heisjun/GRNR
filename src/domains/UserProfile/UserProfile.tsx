import styled from 'styled-components';
import { Avatar } from 'common/components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { followercountState, followingcountState } from 'recoil/count';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = sessionStorage.getItem('accesstoken');

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

    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const myfeedData = await axios.get(`${BASEURL}/api/account/${sessionStorage.getItem('userId')}`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });

                setAccountDto(myfeedData.data.value.accountDto);
                setFollowingCount(myfeedData.data.value.accountDto.followingCount);
                setFollowerCount(myfeedData.data.value.accountDto.followerCount);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

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
    height: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid 1px #dbdbdb;
    background-color: #fff;
    margin-bottom: 40px;
`;

export default UserProfile;
