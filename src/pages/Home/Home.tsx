import { HeadBar } from '../../domains';
import styled from 'styled-components';

const Home: React.FC = () => {
    return (
        <StyledHomeContainer>
            <HeadBar />
        </StyledHomeContainer>
    );
};

const StyledHomeContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

export default Home;
