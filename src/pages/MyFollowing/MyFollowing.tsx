import styled from 'styled-components';
import { Avatar } from 'common/components';
import { Profile } from 'domains';
import axios from 'axios';
import { useEffect, useState } from 'react';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const MyFollowing: React.FC = () => {
    interface Ifollowing {
        accountId: number;
        snsImgUrl: string;
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
                <StyledProfileBlock>
                    <Profile />
                </StyledProfileBlock>
            </StyledProfileContainer>
            <StyledContextContainer>
                <StyledTitleBlock>
                    <StyledTitleText>팔로잉</StyledTitleText>
                </StyledTitleBlock>
                {following.map((item, index) => {
                    return (
                        <div style={{ display: 'flex' }} key={index}>
                            <div style={{ width: '10%' }}>
                                <Avatar width="60%" paddingBottom="60%" borderRadius="100%" picUrl={item.snsImgUrl} />
                            </div>
                            <div style={{ width: '80%' }}>
                                <StyledUserNickname>{item.nickName}</StyledUserNickname>
                                <StyledUserInfo>{item.selfInfo}</StyledUserInfo>
                            </div>
                            <StyledFollowingBtn>
                                <StyledBtnText>팔로잉</StyledBtnText>
                            </StyledFollowingBtn>
                        </div>
                    );
                })}
            </StyledContextContainer>
        </StyledMyphotoContainer>
    );
};

const StyledFollowingBtn = styled.div`
    width: 10%;
    border-radius: 10px;
    background-color: gray;
`;

const StyledBtnText = styled.div`
    font-size: 15px;
    color: white;
    text-align: center;
`;

const StyledUserNickname = styled.div`
    font-size: 15px;
    font-weight: bold;
    color: grey;
`;

const StyledUserInfo = styled.div`
    font-size: 15px;
    font-weight: 400;
    color: grey;
`;

const StyledTitleText = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: grey;
`;

const StyledTitleBlock = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 10px;
`;

const StyledProfileBlock = styled.div`
    position: relative;
    width: 85%;
    padding-bottom: 150%;
`;

const StyledProfileContainer = styled.div`
    width: 25%;
`;

const StyledContextContainer = styled.div`
    width: 73%;
    height: 5000px;
    margin-left: 2%;
`;

const StyledMyphotoContainer = styled.div`
    margin-top: 40px;
    width: 100%;
    display: flex;
`;

export default MyFollowing;
