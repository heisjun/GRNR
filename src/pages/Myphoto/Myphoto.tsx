import styled from 'styled-components';
import { Profile } from 'domains';

const Myphoto: React.FC = () => {
    return (
        <StyledMyphotoContainer>
            <StyledProfileContainer>
                <StyledProfileBlock>
                    <Profile />
                </StyledProfileBlock>
            </StyledProfileContainer>
            <StyledContextContainer></StyledContextContainer>
        </StyledMyphotoContainer>
    );
};

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

const StyledMyphotoContainer = styled.div`
    margin-top: 30px;
    width: 100%;
    display: flex;
`;

export default Myphoto;
