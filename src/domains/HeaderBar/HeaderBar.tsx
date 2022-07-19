import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import { IHeaderBar } from './HeaderBar.type';

const HeaderBar: React.FC<IHeaderBar> = (props) => {
    const { children } = props;
    const [scrollDownToggle, setScrollDownToggle] = useState<boolean>(false);
    const [currentPosY, setCurentPosY] = useState<number>(0);

    const scrollHandler = () => {
        setCurentPosY(window.scrollY);
        if (window.scrollY > currentPosY) {
            setScrollDownToggle(true);
        } else {
            setScrollDownToggle(false);
        }
    };

    useEffect(() => {
        console.log(scrollDownToggle);
    }, [scrollDownToggle]);

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    return (
        <StyledContainer>
            <StyledHeaderBarContainer toggle={scrollDownToggle}>
                <StyledHeaderBar>
                    <StyledMenuButton />
                    <StyledTitleBlock>오늘의집</StyledTitleBlock>
                    <StyledSearchButton />
                    <StyledCartButton />
                </StyledHeaderBar>
            </StyledHeaderBarContainer>
            <StyledContentContainer>{children}</StyledContentContainer>
        </StyledContainer>
    );
};

const headerFadeIn = keyframes`
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0);
    }
`;

const headerFadeOut = keyframes`
    0% {
        transform: translateY(0%);
    }
    100% {
        transform: translateY(-100%);
    }
`;

const StyledMenuButton = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: silver;
    @media screen and (min-width: 800px) {
        display: none;
    }
`;

const StyledSearchButton = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: silver;
    @media screen and (min-width: 800px) {
        display: none;
    }
`;

const StyledCartButton = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: silver;
    @media screen and (min-width: 800px) {
        display: none;
    }
`;

const StyledTitleBlock = styled.h1`
    font-size: 20px;
    @media screen and (max-width: 800px) {
        margin: 0 auto;
    }
    @media screen and (min-width: 800px) {
        font-size: 25px;
    }
`;

const StyledContentContainer = styled.div`
    height: 5000px;
    background-color: silver;
    margin-top: 50px;
    @media screen and (min-width: 800px) {
        margin-top: 80px;
    }
`;

const StyledHeaderBarContainer = styled.div<{ toggle: boolean }>`
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
    animation: ${headerFadeIn} 0.5s;
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
    flex-direction: column;
    width: 100%;
`;

export default HeaderBar;
