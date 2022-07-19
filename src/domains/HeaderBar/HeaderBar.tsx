import styled from 'styled-components';

import { IHeaderBar } from './HeaderBar.type';

const HeaderBar: React.FC<IHeaderBar> = (props) => {
    const { children } = props;
    return (
        <StyledContainer>
            <StyledHeaderBarContainer>
                <StyledHeaderBar>
                    <StyleMenuButton />
                    <StyleTitleBlock>오늘의집</StyleTitleBlock>
                    <StyleSearchButton />
                    <StyleCartButton />
                </StyledHeaderBar>
            </StyledHeaderBarContainer>
            <StyledContentContainer>{children}</StyledContentContainer>
        </StyledContainer>
    );
};

const StyleMenuButton = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: silver;
    @media screen and (min-width: 800px) {
        display: none;
    }
`;

const StyleSearchButton = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: silver;
    @media screen and (min-width: 800px) {
        display: none;
    }
`;

const StyleCartButton = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: silver;
    @media screen and (min-width: 800px) {
        display: none;
    }
`;

const StyleTitleBlock = styled.h1`
    font-size: 20px;
    @media screen and (max-width: 800px) {
        margin: 0 auto;
    }
    @media screen and (min-width: 800px) {
        font-size: 25px;
    }
`;

const StyledContentContainer = styled.div`
    flex: 1;
    height: 5000px;
    background-color: silver;
    margin-top: 50px;
    @media screen and (min-width: 800px) {
        margin-top: 80px;
    }
`;

const StyledHeaderBarContainer = styled.div`
    position: fixed;
    top: 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: white;
    border-bottom: solid 1px;
    border-color: #eaeaea;
`;

const StyledHeaderBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 50px;
    padding-right: 20px;
    @media screen and (min-width: 800px) {
        height: 80px;
        padding: 0px 30px 0px 30px;
    }
    @media screen and (min-width: 1200px) {
        width: 1200px;
    }
`;
const StyledContainer = styled.div`
    display: flex;
    width: 100%;
`;

export default HeaderBar;
