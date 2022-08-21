import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { ISubTabBar } from './SubTabBar.type';
import { headerItems, subTabBarItems } from 'navigations/data';

const maxWidth = process.env.REACT_APP_MAX_WIDTH;
const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const SubTabBar: React.FC<ISubTabBar> = (props) => {
    const { visible, overPage, crntPage, setScrollDownToggle, setSubTabVisible } = props;
    const [fadeAnim, setFadeAnim] = useState<any>();
    const [crntPath, setCrntPath] = useState<string>('');

    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/') {
            setCrntPath(subTabBarItems[0][0].link);
        } else if (location.pathname === headerItems[crntPage].link) {
            console.log(location.pathname);
            console.log(crntPage);
            setCrntPath(subTabBarItems[crntPage][0].link);
        } else {
            setCrntPath(location.pathname);
        }
    }, [location]);

    useEffect(() => {
        visible ? setFadeAnim(subTabBarFadeIn) : setFadeAnim(subTabBarFadeOut);
    }, [visible]);

    useEffect(() => {
        setFadeAnim(null);
    }, []);
    return (
        <StyledSubTabBarContainer fadeAnim={fadeAnim}>
            <StyledSubTabBarBlock>
                {subTabBarItems[overPage].map((item, index) => (
                    <StyledMenuItemBlock key={index} selected={item.link === crntPath ? true : false}>
                        <Link
                            to={item.link}
                            style={{ textDecoration: 'none' }}
                            onClick={() => {
                                setScrollDownToggle(false);
                                setSubTabVisible(true);
                            }}
                        >
                            <StyledMenuItemText color={item.link === crntPath ? 'grey' : 'silver'}>
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
    font-size: 13px;
    color: ${({ color }) => color};
    cursor: pointer;
    &:hover {
        color: #bce55c;
    }
    @media screen and (min-width: ${boundaryWidth}px) {
        font-size: 13px;
    }
`;

const StyledMenuItemBlock = styled.div<{ selected: boolean }>`
    margin-right: 30px;
    border-bottom: solid;
    border-width: ${({ selected }) => (selected ? '3px' : '0px')};
    border-color: grey;
    padding-bottom: ${({ selected }) => (selected ? '0px' : '3px')};
`;

const StyledSubTabBarBlock = styled.div`
    width: 100%;
    display: flex;
    max-width: ${maxWidth}px;
    padding: 0px 20px 0px 20px;
    @media screen and (min-width: ${boundaryWidth}px) {
        padding: 0px 30px 0px 30px;
    }
`;

const StyledSubTabBarContainer = styled.div<{ fadeAnim: any }>`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-bottom: solid 1px;
    border-color: silver;
    animation: ${({ fadeAnim }) => fadeAnim} 0.1s;
    animation-fill-mode: forwards;
    @media screen and (min-width: ${boundaryWidth}px) {
        height: 40px;
    }
`;

export default SubTabBar;
