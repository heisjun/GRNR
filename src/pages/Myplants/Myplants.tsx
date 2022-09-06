import styled from 'styled-components';
import { Profile } from 'domains';

const Myplants: React.FC = () => {
    return (
        <StyledMyplantsContainer>
            <StyledProfileContainer>
                <StyledProfileBlock>
                    <Profile />
                </StyledProfileBlock>
            </StyledProfileContainer>
            <StyledContextContainer></StyledContextContainer>
        </StyledMyplantsContainer>
    );
};

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

const StyledMyplantsContainer = styled.div`
    margin-top: 40px;
    width: 100%;
    display: flex;
`;

export default Myplants;
