import styled from 'styled-components';
import { Avatar, ItemList, MyphotoItem } from 'common/components';
import { Profile } from 'domains';
import { IMyphotoParams } from 'common/types';

const MyFollowing: React.FC = () => {
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
                <div style={{ display: 'flex', backgroundColor: 'blue' }}>
                    <div style={{ width: '10%' }}>
                        <Avatar width="50%" paddingBottom="50%" borderRadius="100%" />
                    </div>
                    <div style={{ width: '80%' }}>
                        <div>가입자 별명</div>
                        <div>가입자 소개</div>
                    </div>
                    <div style={{ width: '10%' }}> 팔로잉버튼</div>
                </div>
            </StyledContextContainer>
        </StyledMyphotoContainer>
    );
};

const StyledTitleText = styled.div`
    font-size: 15px;
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
