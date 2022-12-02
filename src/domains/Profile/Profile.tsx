import styled from 'styled-components';
import { Avatar } from 'common/components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = sessionStorage.getItem('accesstoken');

const Profile: React.FC = () => {
    interface Iprofile {
        accountId: number;
        nickName: string;
        address: string;
        homePage: null;
        selfInfo: null;
        profileUrl: string;
    }
    interface IaccountDto {
        accountId: number;
        nickName: string;
        followerCount: number;
        followingCount: number;
        scrapCount: number;
        likeCount: number;
    }
    const navigate = useNavigate();
    const [profile, setProfile] = useState<Iprofile>();
    const [accountDto, setAccountDto] = useState<IaccountDto>();

    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileData = await axios.get(`${BASEURL}/api/profile/view`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });
                setProfile(profileData.data.value);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const myfeedData = await axios.get(`${BASEURL}/api/account/${sessionStorage.getItem('accountId')}`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });

                setAccountDto(myfeedData.data.value.accountDto);
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
                    <Avatar width="100%" paddingBottom="100%" borderRadius="100%" picUrl={profile?.profileUrl} />
                </StyledAvatarBlock>
                <StyledNameText>{profile?.nickName ? profile.nickName : '닉네임'}</StyledNameText>
                <StyledIntroText>{profile?.selfInfo ? profile?.selfInfo : '소개글을 작성하세요'}</StyledIntroText>
                <div style={{ display: 'flex' }}>
                    <StyledFollowText onClick={() => navigate(`/mypage/profile/follower`)}>
                        팔로워 <span>{accountDto?.followingCount}</span>
                    </StyledFollowText>
                    <StyledFollowText onClick={() => navigate(`/mypage/profile/following`)}>
                        팔로잉 <span>{accountDto?.followerCount}</span>
                    </StyledFollowText>
                </div>
                <StyledEditButton>프로필수정</StyledEditButton>
                <StyledBorderLine />
                <StyledStatBlock>
                    <StyledScrapBlock>
                        <StyledScrapButton src="/btnBlankBookmark.png" />
                        <StyledScrapText>스크랩북</StyledScrapText>
                        <StyledScrapCount>{accountDto?.scrapCount}</StyledScrapCount>
                    </StyledScrapBlock>
                    <StyledLikeBlock>
                        <StyledLikeButton src="/btnBlankHeart.png" />
                        <StyledLikeText>좋아요</StyledLikeText>
                        <StyledLikeCount>{accountDto?.likeCount}</StyledLikeCount>
                    </StyledLikeBlock>
                </StyledStatBlock>
            </StyledProfileContainer>
            <div>
                <StyledFeedNav nav={location.pathname === '/mypage' ? true : false} onClick={() => navigate('/mypage')}>
                    나의피드
                </StyledFeedNav>
                <StyledFeedNav
                    nav={location.pathname === '/mypage/profile/photo' ? true : false}
                    onClick={() => navigate('/mypage/profile/photo')}
                >
                    사진
                </StyledFeedNav>
                <StyledFeedNav>매거진</StyledFeedNav>
                <StyledFeedNav>Q&A</StyledFeedNav>
                <StyledFeedNav>스크랩북</StyledFeedNav>
                <StyledFeedNav>좋아요</StyledFeedNav>
                <StyledFeedNav>설정</StyledFeedNav>
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

const StyledLikeCount = styled.div`
    font-family: NotoSansKR;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: #0d6637;
`;

const StyledLikeText = styled.div`
    margin-top: 9px;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    color: #444;
`;

const StyledLikeButton = styled.img`
    width: 36px;
    height: 36px;
`;

const StyledScrapCount = styled.div`
    font-family: NotoSansKR;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: #0d6637;
`;

const StyledScrapText = styled.div`
    margin-top: 9px;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    color: #444;
`;

const StyledScrapButton = styled.img`
    width: 36px;
    height: 36px;
`;

const StyledLikeBlock = styled.div`
    width: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledScrapBlock = styled.div`
    width: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid #ececec;
`;

const StyledStatBlock = styled.div`
    width: 100%;
    display: flex;
`;

const StyledBorderLine = styled.div`
    width: 248px;
    height: 1px;
    margin: 28px 0 30px;
    background-color: #ececec;
`;

const StyledEditButton = styled.div`
    margin-top: 26px;
    width: 102px;
    height: 34px;
    box-sizing: border-box;
    padding: 7px 17px;
    border-radius: 17px;
    background-color: #ebebeb;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: NotoSansKR;
    font-size: 14px;
    font-weight: 500;
    color: #444;
`;

const StyledFollowText = styled.div`
    margin-top: 11px;
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
    height: 530px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid 1px #dbdbdb;
    background-color: #fff;
    margin-bottom: 40px;
`;

export default Profile;
