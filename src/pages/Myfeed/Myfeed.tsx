import styled from 'styled-components';
import { Profile } from 'domains';

const Myfeed: React.FC = () => {
    return (
        <StyledMyfeedContainer>
            <StyledProfileContainer>
                <StyledProfileBlock>
                    <Profile />
                </StyledProfileBlock>
            </StyledProfileContainer>
            <StyledContextContainer></StyledContextContainer>
        </StyledMyfeedContainer>
    );
};

const StyledPhotoBlock = styled.div``;

const StyledMagazineBlock = styled.div``;

const StyledProfileBlock = styled.div`
    position: relative;
    width: 90%;
    padding-bottom: 170%;
`;

const StyledProfileContainer = styled.div`
    width: 25%;
`;

const StyledContextContainer = styled.div`
    width: 75%;
    height: 5000px;
`;

const StyledMyfeedContainer = styled.div`
    margin-top: 30px;
    width: 100%;
    display: flex;
`;

export default Myfeed;
