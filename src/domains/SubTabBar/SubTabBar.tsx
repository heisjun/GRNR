import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { ISubTabBar } from './SubTabBar.type';
import { headerItems, mypageTabBarItems } from 'navigations/data';

const maxWidth = process.env.REACT_APP_MAX_WIDTH;
const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const SubTabBar: React.FC<ISubTabBar> = (props) => {
    const { visible, overPage, crntPage, setScrollDownToggle, setSubTabVisible, items, justifyContent } = props;
    const [fadeAnim, setFadeAnim] = useState<any>();
    const [crntPath, setCrntPath] = useState<string>('');

    const loc = useLocation();
    useEffect(() => {
        if (loc.pathname.split('/')[1] !== 'mypage') {
            if (loc.pathname === '/') {
                setCrntPath(items[0][0].value);
            } else if (loc.pathname.replaceAll('/', '') === headerItems[crntPage].link.replaceAll('/', '')) {
                setCrntPath(items[crntPage][0].value);
            } else {
                setCrntPath(loc.pathname.split('/')[2]);
            }
        } else {
            if (loc.pathname.replaceAll('/', '') === 'mypage') {
                setCrntPath(items[0][0].value);
            } else if (loc.pathname.replaceAll('/', '') === mypageTabBarItems[crntPage].link.replaceAll('/', '')) {
                setCrntPath(items[crntPage][0].value);
            } else {
                setCrntPath(loc.pathname.split('/')[3]);
            }
        }
    }, [loc, crntPage]);

    useEffect(() => {
        visible ? setFadeAnim(subTabBarFadeIn) : setFadeAnim(subTabBarFadeOut);
    }, [visible]);

    useEffect(() => {
        setFadeAnim(null);
    }, []);
    return (
        <StyledSubTabBarContainer fadeAnim={fadeAnim}>
            <StyledSubTabBarBlock justifyContent={justifyContent ? justifyContent : ''}>
                {items[overPage].map((item, index) => (
                    <StyledMenuItemBlock key={index} selected={item.value === crntPath ? true : false}>
                        <Link
                            to={item.link}
                            style={{ textDecoration: 'none' }}
                            onClick={() => {
                                setScrollDownToggle(false);
                                setSubTabVisible(true);
                            }}
                        >
                            <StyledMenuItemText color={item.value === crntPath ? '#0d6637' : '#676767'}>
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
    font-size: 16px;
    color: ${({ color }) => color};
    cursor: pointer;
    &:hover {
        color: #0d6637;
    }
    @media screen and (min-width: ${boundaryWidth}px) {
        font-size: 16px;
    }
`;

const StyledMenuItemBlock = styled.div<{ selected: boolean }>`
    margin-right: 30px;
    border-bottom: solid;
    border-width: ${({ selected }) => (selected ? '3px' : '0px')};
    border-color: #0d6637;
`;

const StyledSubTabBarBlock = styled.div<{ justifyContent: string }>`
    width: ${({ justifyContent }) => (justifyContent === 'center' ? '' : '100%')};
    display: flex;
    padding: 0px 20px 0px 0px;
    @media screen and (max-width: ${maxWidth}px) {
        padding-left: 20%;
        padding-right: 20%;
    }
    @media screen and (min-width: ${maxWidth}px) {
        margin-left: 390px;
        margin-right: 390px;
    }
`;

const StyledSubTabBarContainer = styled.div<{ fadeAnim: any }>`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    background-color: white;
    border-bottom: solid 1px;
    border-color: silver;
    animation: ${({ fadeAnim }) => fadeAnim} 0.1s;
    animation-fill-mode: forwards;
    box-sizing: border-box;
    @media screen and (min-width: ${boundaryWidth}px) {
        height: 50px;
    }
`;

export default SubTabBar;
