import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UserInfo } from 'recoil/auth';
import { IHeaderBar } from './HeaderBar.type';
import { SubTabBar, MypageTabBar } from 'domains';
import { headerItems, subTabBarItems } from 'navigations/data';

const maxWidth = process.env.REACT_APP_MAX_WIDTH;
const minWidth = process.env.REACT_APP_MIN_WIDTH;
const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const HeaderBar: React.FC<IHeaderBar> = (props) => {
    const { children } = props;
    const [loginStatus, setLoginStatus] = useRecoilState(UserInfo);

    const [scrollDownToggle, setScrollDownToggle] = useState<boolean>(false);
    const [prevPosY, setPrevPosY] = useState<number>(0);
    const [crntPosY, setCrntPosY] = useState<number>(0);
    const [fadeAnim, setFadeAnim] = useState<any>();
    const [subTabVisible, setSubTabVisible] = useState<boolean>(true);
    const [overPage, setOverPage] = useState<number>(0);
    const [crntPage, setCrntPage] = useState<number>(0);
    const [crntPath, setCrntPath] = useState<string>('');

    const loc = useLocation();
    const nav = useNavigate();

    useEffect(() => {
        if (loc.pathname.replaceAll('/', '') === 'gardeners-club') {
            nav('/');
        }
        loc.pathname === '/' ? setCrntPath(headerItems[0].link.split('/')[1]) : setCrntPath(loc.pathname.split('/')[1]);

        for (let i = 0; i < headerItems.length; i++) {
            if (headerItems[i].link.split('/')[1] === crntPath) {
                setOverPage(i);
                setCrntPage(i);
            }
        }
    }, [loc, crntPath]);

    const scrollHandler = () => {
        setCrntPosY(window.scrollY);
    };

    useEffect(() => {
        if (crntPosY >= 50 && crntPosY > prevPosY) {
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
        setFadeAnim(null);
        window.addEventListener('scroll', scrollHandler);
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    useEffect(() => {
        setOverPage(crntPage);
    }, [crntPage]);

    return (
        <StyledContainer>
            <StyledTabsContainer
                onMouseLeave={() => {
                    setOverPage(crntPage);
                    setScrollDownToggle(!subTabVisible);
                }}
            >
                <StyledHeaderBarContainer
                    fadeAnim={fadeAnim}
                    onMouseEnter={() => {
                        setSubTabVisible(!scrollDownToggle);
                        setScrollDownToggle(false);
                    }}
                >
                    <StyledHeaderBar>
                        <StyledTitleBlock>
                            <Link
                                to="/"
                                style={{ textDecoration: 'none' }}
                                onClick={() => {
                                    setCrntPage(0);
                                    setOverPage(0);
                                    setScrollDownToggle(false);
                                    setSubTabVisible(true);
                                }}
                            >
                                <StyledTitleText>로고</StyledTitleText>
                            </Link>
                        </StyledTitleBlock>

                        <StyledMenuItemsContainer>
                            {headerItems.map((item, index) => (
                                <StyledMenuItemBlock key={index}>
                                    <Link
                                        to={item.link}
                                        style={{ textDecoration: 'none' }}
                                        onClick={() => {
                                            setCrntPage(index);
                                            setOverPage(index);
                                            setScrollDownToggle(false);
                                            setSubTabVisible(true);
                                        }}
                                        onMouseEnter={() => setOverPage(index)}
                                    >
                                        <StyledMenuItemText
                                            color={item.link.split('/')[1] === crntPath ? 'grey' : 'silver'}
                                        >
                                            {item.name}
                                        </StyledMenuItemText>
                                    </Link>
                                </StyledMenuItemBlock>
                            ))}
                        </StyledMenuItemsContainer>
                        <StyledSearchBar value="" />
                        <StyledButtonsCotainer>
                            <StyledSearchButton />
                            <Link to="/mypage">
                                <StyledCartButton />
                            </Link>
                            <StyledLoginButton
                                onClick={() => {
                                    setLoginStatus({ ...loginStatus, isLogin: true });
                                    location.reload();
                                }}
                            >
                                로그인
                            </StyledLoginButton>
                            <StyledRegisterButton>회원가입</StyledRegisterButton>
                        </StyledButtonsCotainer>
                    </StyledHeaderBar>
                </StyledHeaderBarContainer>
                <StyledSubTabBarBlock>
                    {crntPath === 'mypage' ? (
                        <MypageTabBar
                            scrollDownToggle={scrollDownToggle}
                            setScrollDownToggle={setScrollDownToggle}
                            setSubTabVisible={setSubTabVisible}
                        />
                    ) : (
                        <SubTabBar
                            visible={!scrollDownToggle}
                            overPage={overPage}
                            crntPage={crntPage}
                            setScrollDownToggle={setScrollDownToggle}
                            setSubTabVisible={setSubTabVisible}
                            items={subTabBarItems}
                        />
                    )}
                </StyledSubTabBarBlock>
            </StyledTabsContainer>
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

const StyledSearchBar = styled.input`
    display: none;
    height: 40%;
    border: solid 2px;
    border-color: silver;
    border-radius: 20px;
    margin-right: 10px;
    @media screen and (min-width: ${Number(boundaryWidth) + 150}px) {
        top: 80px;
        width: 200px;
        display: inline;
    }
`;

const StyledSubTabBarBlock = styled.div`
    position: fixed;
    width: 100%;
    top: 50px;
    left: 0px;
    z-index: 1;
    @media screen and (min-width: ${boundaryWidth}px) {
        top: 80px;
    }
`;

const StyledLoginButton = styled.div`
    font-size: 12px;
    color: grey;
    cursor: pointer;
    margin-right: 10px;
    @media screen and (min-width: ${boundaryWidth}px) {
        font-size: 13px;
    }
`;

const StyledRegisterButton = styled.div`
    font-size: 12px;
    color: grey;
    cursor: pointer;
    margin-right: 0px;
    @media screen and (min-width: ${boundaryWidth}px) {
        font-size: 13px;
    }
`;

const StyledSearchButton = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 25px;
    background-color: silver;
    cursor: pointer;
    margin-right: 10px;
    @media screen and (min-width: ${boundaryWidth}px) {
        width: 30px;
        height: 30px;
    }
`;

const StyledCartButton = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 25px;
    background-color: silver;
    cursor: pointer;
    margin-right: 10px;
    @media screen and (min-width: ${boundaryWidth}px) {
        width: 30px;
        height: 30px;
    }
    &:hover {
        background-color: grey;
    }
`;

const StyledButtonsCotainer = styled.div`
    height: 25px;
    display: flex;
    align-items: center;
    @media screen and (min-width: ${boundaryWidth}px) {
        height: 30px;
    }
`;

const StyledTitleText = styled.h1`
    font-size: 20px;
    cursor: pointer;
    color: black;
    &:hover {
        color: #bce55c;
    }
`;

const StyledTitleBlock = styled.div`
    @media screen and (max-width: ${boundaryWidth}px) {
        margin-right: auto;
    }
`;

const StyledMenuItemsContainer = styled.div`
    flex: 1;
    display: flex;
    @media screen and (max-width: ${boundaryWidth}px) {
        display: none;
    }
`;

const StyledMenuItemText = styled.div<{ color: string }>`
    font-size: 15px;
    cursor: pointer;
    color: ${({ color }) => color};
    &:hover {
        color: #bce55c;
    }
`;

const StyledMenuItemBlock = styled.h2`
    margin-left: 50px;
    @media screen and (max-width: ${boundaryWidth}px) {
        display: none;
    }
`;

const StyledContentBlock = styled.div`
    width: 100%;
    min-width: ${minWidth}px;
    max-width: ${maxWidth}px;
    padding: 0px 10px 0px 10px;
    @media screen and (min-width: ${boundaryWidth}px) {
        padding: 0px 30px 0px 30px;
    }
`;

const StyledContentContainer = styled.div`
    background-color: white;
    display: flex;
    margin-top: 100px;
    justify-content: center;
    z-index: 0;
    @media screen and (max-width: ${minWidth}px) {
        justify-content: start;
    }
    @media screen and (min-width: ${boundaryWidth}px) {
        margin-top: 150px;
    }
`;

const StyledTabsContainer = styled.div``;

const StyledHeaderBarContainer = styled.div<{ fadeAnim: any }>`
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    z-index: 2;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: white;
    border-bottom: solid 1px;
    border-color: silver;
    @media screen and (max-width: ${minWidth}px) {
        justify-content: start;
    }
    @media screen and (max-width: ${boundaryWidth}px) {
        animation: ${({ fadeAnim }) => fadeAnim} 0.1s;
        animation-fill-mode: forwards;
    }
`;

const StyledHeaderBar = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    min-width: ${minWidth}px;
    max-width: ${maxWidth}px;
    height: 50px;
    padding: 0px 20px 0px 20px;
    @media screen and (min-width: ${boundaryWidth}px) {
        height: 80px;
        padding: 0px 30px 0px 30px;
    }
`;

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export default HeaderBar;
