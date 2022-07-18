import styled from 'styled-components';

const HeadBar: React.FC = () => {
    return (
        <StyledHeadBarContainer>
            <StyledHeadBar>test</StyledHeadBar>
        </StyledHeadBarContainer>
    );
};

const StyledHeadBar = styled.div`
    width: 1000px;
    height: 100%;
`;

const StyledHeadBarContainer = styled.div`
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    border-bottom: solid 1px;
    border-color: #eaeaea;
`;

export default HeadBar;
