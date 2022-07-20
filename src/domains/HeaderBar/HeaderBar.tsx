import { useState, useEffect } from 'react';
import { IHeaderBar } from './HeaderBar.type';
import { SubTabBar } from 'domains/SubTabBar';
import styled, { keyframes } from 'styled-components';

const HeaderBar: React.FC<IHeaderBar> = (props) => {
    const { children } = props;
    const [scrollDownToggle, setScrollDownToggle] = useState<boolean>(false);
    const [prevPosY, setPrevPosY] = useState<number>(0);
    const [crntPosY, setCrntPosY] = useState<number>(0);
    const [fadeAnim, setFadeAnim] = useState<any>();

    const scrollHandler = () => {
        setCrntPosY(window.scrollY);
    };

    useEffect(() => {
        if (crntPosY > prevPosY) {
            setScrollDownToggle(true);
        } else {
            setScrollDownToggle(false);
        }
        setPrevPosY(crntPosY);
    }, [crntPosY]);

    useEffect(() => {
        scrollDownToggle === true ? setFadeAnim(headerFadeOut) : setFadeAnim(headerFadeIn);
    }, [scrollDownToggle]);

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    return (
        <StyledContainer>
            <StyledHeaderBarContainer fadeAnim={fadeAnim}>
                <StyledHeaderBar>
                    <StyledMenuButton />
                    <StyledTitleBlock>홈페이지 제목</StyledTitleBlock>
                    <StyledSearchButton />
                    <StyledCartButton />
                </StyledHeaderBar>
            </StyledHeaderBarContainer>
            <StyledSubTabBarBlock>
                <SubTabBar visible={!scrollDownToggle} />
            </StyledSubTabBarBlock>
            <StyledContentContainer>
                <StyledContentBlock>{children}</StyledContentBlock>
            </StyledContentContainer>
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

const StyledSubTabBarBlock = styled.div`
    position: fixed;
    width: 100%;
    top: 50px;
    @media screen and (min-width: 800px) {
        top: 80px;
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

const StyledContentBlock = styled.div`
    width: 100%;
    @media screen and (min-width: 800px) {
        padding: 0px 30px 0px 30px;
    }
    @media screen and (min-width: 1100px) {
        width: 1100px;
    }
`;

const StyledContentContainer = styled.div`
    background-color: white;
    display: flex;
    margin-top: 100px;
    justify-content: center;
    @media screen and (min-width: 800px) {
        margin-top: 140px;
    }
`;

const StyledHeaderBarContainer = styled.div<{ fadeAnim: any }>`
    position: fixed;
    top: 0px;
    display: flex;
    z-index: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: white;
    border-bottom: solid 1px;
    border-color: #eaeaea;
    @media screen and (max-width: 800px) {
        animation: ${({ fadeAnim }) => fadeAnim} 0.1s;
        animation-fill-mode: forwards;
    }
`;

const StyledHeaderBar = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding-right: 20px;
    @media screen and (min-width: 800px) {
        height: 80px;
        padding: 0px 30px 0px 30px;
    }
    @media screen and (min-width: 1100px) {
        width: 1100px;
    }
`;
const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export default HeaderBar;
