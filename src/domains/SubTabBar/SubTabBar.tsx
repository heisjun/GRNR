import { useState, useEffect } from 'react';
import { ISubTabBar } from './SubTabBar.type';

import styled, { keyframes } from 'styled-components';

const SubTabBar: React.FC<ISubTabBar> = (props) => {
    const { visible } = props;
    const [fadeAnim, setFadeAnim] = useState<any>();

    useEffect(() => {
        visible ? setFadeAnim(subTabBarFadeIn) : setFadeAnim(subTabBarFadeOut);
    }, [visible]);

    return (
        <StyledSubTabBarContainer fadeAnim={fadeAnim}>
            <StyledSubTabBarBlock>
                <StyledMenuItem>메뉴1</StyledMenuItem>
                <StyledMenuItem>메뉴2</StyledMenuItem>
                <StyledMenuItem>메뉴3</StyledMenuItem>
                <StyledMenuItem>메뉴4</StyledMenuItem>
                <StyledMenuItem>메뉴5</StyledMenuItem>
            </StyledSubTabBarBlock>
        </StyledSubTabBarContainer>
    );
};

const subTabBarFadeIn = keyframes`
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0);
    }
`;

const subTabBarFadeOut = keyframes`
    0% {
        transform: translateY(0%);
    }
    100% {
        transform: translateY(-100%);
        opacity: 0;
    }
`;

const StyledMenuItem = styled.h2`
    font-size: 17px;
    margin-right: 30px;
`;

const StyledSubTabBarBlock = styled.div`
    width: 100%;
    display: flex;
    @media screen and (min-width: 800px) {
        padding: 0px 30px 0px 30px;
    }
    @media screen and (min-width: 1100px) {
        width: 1100px;
    }
`;

const StyledSubTabBarContainer = styled.div<{ fadeAnim: any }>`
    width: 100%;
    height: 50px;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-bottom: solid 1px;
    border-color: #eaeaea;
    animation: ${({ fadeAnim }) => fadeAnim} 0.1s;
    animation-fill-mode: forwards;
`;

export default SubTabBar;
