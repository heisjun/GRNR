import styled from 'styled-components';
import { Avatar } from 'common/components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

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
        <StyledProfileContainer>
            <StyledAvatarBlock>
                <Avatar width="100%" paddingBottom="100%" borderRadius="100%" picUrl={profile?.profileUrl} />
            </StyledAvatarBlock>
            <StyledNameText>{profile?.nickName ? profile.nickName : '닉네임'}</StyledNameText>
            <StyledIntroText>{profile?.selfInfo ? profile?.selfInfo : '소개글을 작성하세요'}</StyledIntroText>
            <div style={{ display: 'flex' }}>
                <StyledFollowText onClick={() => navigate(`/mypage/profile/follower`)}>
                    팔로워 <span>{accountDto?.followerCount ? accountDto?.followerCount : 0}</span>
                </StyledFollowText>
                <StyledFollowText onClick={() => navigate(`/mypage/profile/following`)}>
                    팔로잉 <span>{accountDto?.followingCount ? accountDto?.followingCount : 0}</span>
                </StyledFollowText>
            </div>
            <StyledEditButton>프로필 수정</StyledEditButton>
            <StyledBorderLine />
            <StyledStatBlock>
                <StyledScrapBlock>
                    <StyledScrapButton src={'/btnblankBookMark.png'} />
                    <StyledScrapText>스크랩</StyledScrapText>
                    <StyledScrapCount>{accountDto?.scrapCount ? accountDto?.scrapCount : 0}</StyledScrapCount>
                </StyledScrapBlock>
                <StyledLikeBlock>
                    <StyledLikeButton src={'/btnblankHeart.png'} />
                    <StyledLikeText>좋아요</StyledLikeText>
                    <StyledLikeCount>{accountDto?.likeCount ? accountDto?.likeCount : 0}</StyledLikeCount>
                </StyledLikeBlock>
            </StyledStatBlock>
        </StyledProfileContainer>
    );
};

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
