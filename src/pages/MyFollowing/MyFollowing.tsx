import styled from 'styled-components';
import { Avatar } from 'common/components';
import { Profile } from 'domains';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = sessionStorage.getItem('accesstoken');

const MyFollowing: React.FC = () => {
    const navigate = useNavigate();
    interface Ifollowing {
        accountId: number;
        profileUrl: string;
        nickName: string;
        selfInfo: null;
    }
    const [following, setFollowing] = useState<Ifollowing[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const myfeedData = await axios.get(
                    `${BASEURL}/api/account/${sessionStorage.getItem('accountId')}/following`,
                    {
                        headers: {
                            Authorization: `Bearer ${TOKEN}`,
                        },
                    },
                );
                setFollowing(myfeedData.data.value.content);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);
    return (
        <StyledMyphotoContainer>
            <StyledProfileContainer>
                <Profile />
                <div>
                    <StyledFeedNav onClick={() => navigate('/mypage')}>나의피드</StyledFeedNav>
                    <StyledFeedNav onClick={() => navigate('/mypage/profile/photo')}>사진</StyledFeedNav>
                    <StyledFeedNav>매거진</StyledFeedNav>
                    <StyledFeedNav>Q&A</StyledFeedNav>
                    <StyledFeedNav>스크랩북</StyledFeedNav>
                    <StyledFeedNav>좋아요</StyledFeedNav>
                    <StyledFeedNav>설정</StyledFeedNav>
                </div>
            </StyledProfileContainer>
            <StyledContextContainer>
                <StyledContexTitle>팔로잉</StyledContexTitle>
                {following.map((item, index) => {
                    return (
                        <StyledFollowingContainer key={index}>
                            <div style={{ width: 60, marginRight: 19 }}>
                                <Avatar
                                    width="100%"
                                    paddingBottom="100%"
                                    borderRadius="100%"
                                    picUrl={item.profileUrl}
                                />
                            </div>
                            <div style={{ width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                                <StyledUserNickname>{item.nickName}</StyledUserNickname>
                                <StyledUserInfo>{item.selfInfo}소개</StyledUserInfo>
                            </div>
                            <StyledFollowingBtn>
                                <StyledBtnText>팔로잉</StyledBtnText>
                            </StyledFollowingBtn>
                        </StyledFollowingContainer>
                    );
                })}
            </StyledContextContainer>
        </StyledMyphotoContainer>
    );
};

const StyledFollowingContainer = styled.div`
    display: flex;
    padding-bottom: 15px;
    padding-top: 15px;
    align-items: center;
    border-bottom: 1px solid #ececec;
`;

const StyledContexTitle = styled.div`
    font-family: NotoSansKR;
    font-size: 30px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #272727;
    margin-bottom: 30px;
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

const StyledProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 280px;
    height: 1000px;
    background-color: white;
    margin-right: 64px;
`;

const StyledFollowingBtn = styled.div`
    box-sizing: border-box;
    width: 72px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    border: solid 1px #0d6637;
    background-color: #fff;
`;

const StyledBtnText = styled.div`
    font-size: 13px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #0d6637;
`;

const StyledUserNickname = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: #272727;
    margin-bottom: 4px;
`;

const StyledUserInfo = styled.div`
    font-family: NotoSansKR;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #424242;
`;

const StyledContextContainer = styled.div`
    width: 796px;
`;

const StyledMyphotoContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export default MyFollowing;
