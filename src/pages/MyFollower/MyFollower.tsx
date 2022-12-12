import styled from 'styled-components';
import { Avatar } from 'common/components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { followercountState } from 'recoil/count';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = sessionStorage.getItem('accesstoken');

const MyFollower: React.FC = () => {
    const navigate = useNavigate();
    interface Ifollowing {
        accountId: number;
        profileUrl: string;
        nickName: string;
        selfInfo: null;
        myFollow: boolean;
    }
    const [following, setFollowing] = useState<Ifollowing[]>([]);
    const [followerCount, setFollowerCount] = useRecoilState(followercountState);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const myfeedData = await axios.get(
                    `${BASEURL}/api/account/${sessionStorage.getItem('accountId')}/follower`,
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
            setFollowing(following.map((it) => (it.nickName === followingName ? { ...it, myFollow: true } : it)));
            setFollowerCount(followerCount + 1);
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
        console.log(saveFollowDto);
        try {
            await axios.post(`${BASEURL}/api/following/save`, saveFollowDto, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            setFollowing(following.map((it) => (it.nickName === followingName ? { ...it, myFollow: false } : it)));
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <StyledMyphotoContainer>
            <StyledContextContainer>
                <StyledContexTitle>팔로워</StyledContexTitle>
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
                            {item.myFollow ? (
                                <StyledFollowingBtn onClick={() => onUnFollowing(item.nickName)}>
                                    <StyledBtnText>팔로잉</StyledBtnText>
                                </StyledFollowingBtn>
                            ) : (
                                <StyledFollowBtn onClick={() => onFollowing(item.nickName)}>
                                    <StyledFollowBtnText>팔로우</StyledFollowBtnText>
                                </StyledFollowBtn>
                            )}
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

const StyledFollowingBtn = styled.div`
    box-sizing: border-box;
    width: 72px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    background-color: #0d6637;
    cursor: pointer;
`;

const StyledFollowBtn = styled.div`
    box-sizing: border-box;
    width: 72px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    border: solid 1px #0d6637;
    background-color: #fff;
    cursor: pointer;
`;

const StyledBtnText = styled.div`
    font-size: 13px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: white;
`;

const StyledFollowBtnText = styled.div`
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
export default MyFollower;
