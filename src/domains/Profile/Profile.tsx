import styled from 'styled-components';
import { Avatar } from 'common/components';

const Profile: React.FC = () => {
    return (
        <StyledProfileContainer>
            <StyledAvatarBlock>
                <Avatar width="100%" paddingBottom="100%" borderRadius="100%" />
            </StyledAvatarBlock>
            <StyledNameText>그리너리</StyledNameText>
            <StyledIntroText>this is captain speaking</StyledIntroText>
            <StyledFollowText>팔로워 0 | 팔로잉 12</StyledFollowText>
            <StyledEditButton>수정</StyledEditButton>
            <StyledBorderLine />
        </StyledProfileContainer>
    );
};

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
