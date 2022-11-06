import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { UserInfo } from 'recoil/auth';
import { IHeaderBar } from './HeaderBar.type';
import { SubTabBar, MypageTabBar, Footer } from 'domains';
import { headerItems, subTabBarItems } from 'navigations/data';
import { WritingDropdown, MypageDropdown } from 'common/components';
import { Login } from 'pages';
import UserpageTabBar from 'domains/UserpageTabBar';

const maxWidth = process.env.REACT_APP_MAX_WIDTH;
const minWidth = process.env.REACT_APP_MIN_WIDTH;
const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const HeaderBar: React.FC<IHeaderBar> = (props) => {
    const { children } = props;

    const [scrollDownToggle, setScrollDownToggle] = useState<boolean>(false);
    const [prevPosY, setPrevPosY] = useState<number>(0);
    const [crntPosY, setCrntPosY] = useState<number>(0);
    const [fadeAnim, setFadeAnim] = useState<any>();
    const [subTabVisible, setSubTabVisible] = useState<boolean>(true);
    const [overPage, setOverPage] = useState<number>(0);
    const [crntPage, setCrntPage] = useState<number>(0);
    const [crntPath, setCrntPath] = useState<string>('');

    const { isLogin } = useRecoilValue(UserInfo);

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

    if (isLogin === true) {
        if (
            loc.pathname === '/community/question/new' ||
            loc.pathname === '/community/question/new/' ||
            loc.pathname === '/upload' ||
            loc.pathname === '/upload/photo' ||
            loc.pathname === '/upload/video' ||
            loc.pathname === '/community/photo/edit'
        )
            return (
                <StyledContainer>
                    <StyledContentContainer>
                        <StyledContentBlock>{children}</StyledContentBlock>
                    </StyledContentContainer>
                    <Footer />
                </StyledContainer>
            );
        else
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
                                        <StyledLogoImg src="/Gardener.png" />
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
                                                    color={item.link.split('/')[1] === crntPath ? '#0d6637' : '#676767'}
                                                >
                                                    {item.name}
                                                </StyledMenuItemText>
                                            </Link>
                                        </StyledMenuItemBlock>
                                    ))}
                                </StyledMenuItemsContainer>
                                <StyledButtonsCotainer>
                                    <StyledSearchBar src={'/btnSearch.png'} />
                                    <StyledSearchBar src={'/btnAlarm.png'} />
                                    <MypageDropdown />
                                    <WritingDropdown />
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
                            ) : crntPath === 'userpage' ? (
                                <UserpageTabBar
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
                    <Footer />
                </StyledContainer>
            );
    } else {
        if (loc.pathname === '/login' || loc.pathname === '/register')
            return (
                <StyledLoginContainer>
                    <StyledTabsContainer>
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
                                        <StyledLogoImg src="/Gardener.png" />
                                    </Link>
                                </StyledTitleBlock>
                            </StyledHeaderBar>
                        </StyledHeaderBarContainer>
                    </StyledTabsContainer>
                    <StyledLoginContentContainer>
                        <StyledContentBlock>{children}</StyledContentBlock>
                    </StyledLoginContentContainer>
                    <Footer />
                </StyledLoginContainer>
            );
        else if (loc.pathname === '/upload' || loc.pathname === '/upload/photo' || loc.pathname === '/upload/video')
            return (
                <div style={{ display: 'flex', alignItems: 'center', height: 700 }}>
                    <Login />
                </div>
            );
        else
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
                                        <StyledLogoImg src="/Gardener.png" />
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
                                                    color={item.link.split('/')[1] === crntPath ? '#0d6637' : '#676767'}
                                                >
                                                    {item.name}
                                                </StyledMenuItemText>
                                            </Link>
                                        </StyledMenuItemBlock>
                                    ))}
                                </StyledMenuItemsContainer>
                                <StyledButtonsCotainer>
                                    <StyledSearchButton />
                                    <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
                                        <StyledLoginButton>로그인</StyledLoginButton>
                                    </Link>
                                    <StyledBoundary>|</StyledBoundary>
                                    <Link to="/api/register" style={{ textDecoration: 'none', color: 'black' }}>
                                        <StyledRegisterButton>회원가입</StyledRegisterButton>
                                    </Link>
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
                    <Footer />
                </StyledContainer>
            );
    }
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

const StyledLogoImg = styled.img`
    width: 150px;
`;

const StyledSearchBar = styled.img`
    height: 30px;
    width: 30px;
    padding-right: 20px;
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
    color: #272727;
    cursor: pointer;
    @media screen and (min-width: ${boundaryWidth}px) {
        font-size: 13px;
    }
`;

const StyledBoundary = styled.div`
    font-size: 12px;
    color: #272727;
    margin-right: 5px;
    margin-left: 5px;
    @media screen and (min-width: ${boundaryWidth}px) {
        font-size: 13px;
    }
`;

const StyledRegisterButton = styled.div`
    font-size: 12px;
    color: #272727;
    cursor: pointer;
    margin-right: 10px;
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
    display: none;
`;

const StyledButtonsCotainer = styled.div`
    height: 25px;
    display: flex;
    align-items: center;
    @media screen and (min-width: ${boundaryWidth}px) {
        height: 30px;
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
    font-size: 18px;
    cursor: pointer;
    color: ${({ color }) => color};
    &:hover {
        color: #0d6637;
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
    //min-width: ${minWidth}px;
    //max-width: ${maxWidth}px;
    //padding: 0px 10px 0px 10px;
    //@media screen and (min-width: ${boundaryWidth}px) {
    //    padding: 0px 30px 0px 30px;
    //}
`;

const StyledContentContainer = styled.div`
    background-color: white;
    display: flex;
    margin-top: 100px;
    margin-bottom: 100px;
    justify-content: center;
    z-index: 0;
    @media screen and (max-width: ${minWidth}px) {
        justify-content: start;
    }
    @media screen and (min-width: ${boundaryWidth}px) {
        margin-top: 150px;
    }
`;

const StyledLoginContentContainer = styled.div`
    display: flex;
    margin-top: 100px;
    margin-bottom: 100px;
    justify-content: center;
    align-items: center;
    z-index: 0;
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
    height: 50px;
    padding: 0px 20px 0px 20px;
    @media screen and (min-width: ${boundaryWidth}px) {
        height: 80px;
        padding-left: 20%;
        padding-right: 20%;
    }
`;

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 100%;
    margin: 0 auto;
    width: 100%;
`;

const StyledLoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #f5f5f5;
`;

export default HeaderBar;
