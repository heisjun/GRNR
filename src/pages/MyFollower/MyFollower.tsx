import styled from 'styled-components';
import { Avatar } from 'common/components';
import { Profile } from 'domains';

const MyFollower: React.FC = () => {
    return (
        <StyledMyphotoContainer>
            <StyledProfileContainer>
                <StyledProfileBlock>
                    <Profile />
                </StyledProfileBlock>
            </StyledProfileContainer>
            <StyledContextContainer>
                <StyledTitleBlock>
                    <StyledTitleText>팔로워</StyledTitleText>
                </StyledTitleBlock>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '10%' }}>
                        <Avatar width="60%" paddingBottom="60%" borderRadius="100%" />
                    </div>
                    <div style={{ width: '80%' }}>
                        <StyledUserNickname>가입자 별명</StyledUserNickname>
                        <StyledUserInfo>따뜻한 식물이 가득한 우리집</StyledUserInfo>
                    </div>
                    <StyledFollowingBtn>
                        <StyledBtnText>팔로잉</StyledBtnText>
                    </StyledFollowingBtn>
                </div>
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

export default MyFollower;
