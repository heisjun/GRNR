import styled from 'styled-components';
import { Avatar } from 'common/components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile: React.FC = () => {
    interface Iprofile {
        nickname: string;
        profile_image: string;
        thumbnail_image: string;
    }
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<Iprofile>();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data.properties);
                setProfile(response.data.properties);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <StyledProfileContainer>
            <StyledAvatarBlock>
                <Avatar width="100%" paddingBottom="100%" borderRadius="100%" picUrl={profile?.profile_image} />
            </StyledAvatarBlock>
            <StyledNameText>{profile?.nickname ? profile.nickname : '닉네임'}</StyledNameText>
            <StyledIntroText>this is captain speaking</StyledIntroText>
            <div style={{ display: 'flex' }}>
                <StyledFollowText onClick={() => navigate(`/mypage/profile/follower`)}>팔로워 0 </StyledFollowText>
                <StyledFollowText onClick={() => navigate(`/mypage/profile/following`)}>팔로잉 0 </StyledFollowText>
            </div>
            <StyledEditButton>수정</StyledEditButton>
            <StyledBorderLine />
            <StyledStatBlock>
                <StyledScrapBlock>
                    <StyledScrapButton />
                    <StyledScrapText>스크랩</StyledScrapText>
                    <StyledScrapCount>123</StyledScrapCount>
                </StyledScrapBlock>
                <StyledLikeBlock>
                    <StyledLikeButton />
                    <StyledLikeText>스크랩</StyledLikeText>
                    <StyledLikeCount>123</StyledLikeCount>
                </StyledLikeBlock>
            </StyledStatBlock>
        </StyledProfileContainer>
    );
};

const StyledLikeCount = styled.div`
    font-size: 14px;
    font-weight: bold;
    color: grey;
`;

const StyledLikeText = styled.div`
    font-size: 12px;
    color: grey;
    margin-top: 5px;
`;

const StyledLikeButton = styled.div`
    width: 100%;
    padding-bottom: 100%;
    border-radius: 100%;
    background-color: grey;
`;

const StyledScrapCount = styled.div`
    font-size: 14px;
    font-weight: bold;
    color: grey;
`;

const StyledScrapText = styled.div`
    font-size: 12px;
    color: grey;
    margin-top: 5px;
`;

const StyledScrapButton = styled.div`
    width: 100%;
    padding-bottom: 100%;
    border-radius: 100%;
    background-color: grey;
`;

const StyledLikeBlock = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
`;

const StyledScrapBlock = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
`;

const StyledStatBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const StyledBorderLine = styled.div`
    width: 80%;
    border: solid 1px;
    border-color: silver;
`;

const StyledEditButton = styled.div`
    width: 25%;
    height: 8%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 2px;
    border-radius: 5px;
    border-color: silver;
    font-size: 11px;
    color: grey;
`;

const StyledFollowText = styled.div`
    font-size: 11px;
    color: grey;
    padding-left: 5px;
    padding-right: 5px;
    cursor: pointer;
`;

const StyledIntroText = styled.div`
    font-size: 11px;
    color: grey;
`;

const StyledNameText = styled.div`
    font-size: 17px;
    font-weight: bold;
    color: grey;
`;

const StyledAvatarBlock = styled.div`
    width: 45%;
`;

const StyledProfileContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    border: solid 2px;
    border-color: silver;
    border-radius: 5px;
`;

export default Profile;
