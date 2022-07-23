import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { ISubTabBar } from './SubTabBar.type';
import { subTabBarItems } from 'common/data';

const maxWidth = process.env.REACT_APP_MAX_WIDTH;
const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const SubTabBar: React.FC<ISubTabBar> = (props) => {
    const { page, visible } = props;
    const [fadeAnim, setFadeAnim] = useState<any>();
    const [subPage, setSubPage] = useState<number>(0);

    useEffect(() => {
        visible ? setFadeAnim(subTabBarFadeIn) : setFadeAnim(subTabBarFadeOut);
    }, [visible]);

    useEffect(() => {
        setFadeAnim(null);
    }, []);
    return (
        <StyledSubTabBarContainer fadeAnim={fadeAnim}>
            <StyledSubTabBarBlock>
                {subTabBarItems[page].map((item, index) => (
                    <StyledMenuItemBlock key={index}>
                        <Link to={item.link} style={{ textDecoration: 'none' }} onClick={() => setSubPage(index)}>
                            <StyledMenuItemText color={index === subPage ? 'black' : 'grey'}>
                                {item.name}
                            </StyledMenuItemText>
                        </Link>
                    </StyledMenuItemBlock>
                ))}
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

const StyledMenuItemText = styled.h2<{ color: string }>`
    font-size: 15px;
    color: ${({ color }) => color};
    cursor: pointer;
    &:hover {
        color: #bce55c;
    }
`;

const StyledMenuItemBlock = styled.div`
    margin-right: 30px;
`;

const StyledSubTabBarBlock = styled.div`
    width: 100%;
    display: flex;
    @media screen and (min-width: ${boundaryWidth}px) {
        padding: 0px 30px 0px 30px;
    }
    @media screen and (min-width: ${maxWidth}px) {
        width: ${maxWidth}px;
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
