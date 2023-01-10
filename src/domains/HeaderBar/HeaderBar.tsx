import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserInfo } from 'recoil/auth';
import { IHeaderBar } from './HeaderBar.type';
import { SubTabBar, MypageTabBar, Footer, Profile } from 'domains';
import { headerItems, subTabBarItems } from 'navigations/data';
import { WritingDropdown, MypageDropdown } from 'common/components';
import { Login } from 'pages';
import UserProfile from 'domains/UserProfile';
import axios from 'axios';
import { AlarmcountState } from 'recoil/count';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

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
    const [isActive, setIsActive] = useState(false);
    interface IAlram {
        value: number;
    }
    const [alarm, setAlarm] = useState<IAlram>();
    const [alarmCount, setAlarmCount] = useRecoilState(AlarmcountState);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASEURL}/api/alarm/view/check`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });
                setAlarm(response.data);
                setAlarmCount(response.data.value);
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, []);

    if (isLogin === true) {
        if (
            loc.pathname === '/community/question/new' ||
            loc.pathname === '/community/question/new/' ||
            loc.pathname === '/upload' ||
            loc.pathname === '/upload/photo' ||
            loc.pathname === '/upload/video' ||
            loc.pathname === '/community/photo/edit' ||
            loc.pathname === '/community/following'
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
                                        <StyledLogoImg src="/gardenersLogo.png" />
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
                                    {/* {isActive && <StyledSearchBaInput />} */}
                                    <StyledSearchBar src={'/btnSearch.png'} onClick={() => setIsActive(!isActive)} />

                                    <StyledAlarm src={'/btnAlarm.png'} onClick={() => nav('/myalarm')} />
                                    {alarmCount === 0 ? null : (
                                        <StyledAlarmDot>
                                            <span>{alarmCount}</span>
                                        </StyledAlarmDot>
                                    )}
                                    <MypageDropdown />
                                    <WritingDropdown />
                                </StyledButtonsCotainer>
                            </StyledHeaderBar>
                        </StyledHeaderBarContainer>
                        <StyledSubTabBarBlock>
                            {crntPath === 'mypage' ? (
                                <></>
                            ) : crntPath === 'userpage' ? (
                                <></>
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
                        {crntPath === 'mypage' ? (
                            <div
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'center',
                                }}
                            >
                                <div style={{ marginRight: 64 }}>
                                    <Profile />
                                </div>
                                <div>{children}</div>
                            </div>
                        ) : crntPath === 'userpage' ? (
                            <div
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'center',
                                }}
                            >
                                <div style={{ marginRight: 64 }}>
                                    <UserProfile />
                                </div>
                                <div>{children}</div>
                            </div>
                        ) : (
                            <StyledContentBlock>{children}</StyledContentBlock>
                        )}
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
                                        <StyledLogoImg src="/gardenersLogo.png" />
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
                                        <StyledLogoImg src="/gardenersLogo.png" />
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
                                    <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
                                        <StyledLoginButton>로그인</StyledLoginButton>
                                    </Link>
                                    <StyledBoundary />
                                    <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
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
    width: 198px;
`;

const StyledSearchBar = styled.img`
    height: 30px;
    width: 30px;
    padding-right: 20px;
`;

const StyledAlarm = styled.img`
    height: 30px;
    width: 30px;
    padding-right: 20px;
    position: relative;
    cursor: pointer;
`;

const StyledAlarmDot = styled.div`
    height: 15px;
    width: 15px;
    background-color: green;
    border-radius: 100%;
    position: absolute;
    margin-left: 65px;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
        color: white;
        font-size: 11px;
        font-weight: bold;
    }
`;
const StyledSubTabBarBlock = styled.div`
    position: fixed;
    width: 100%;
    top: 80px;
    left: 0px;
    z-index: 1;
`;

const StyledLoginButton = styled.div`
    font-size: 15px;
    font-weight: 500;
    color: #272727;
    cursor: pointer;
`;

const StyledBoundary = styled.div`
    width: 1px;
    height: 18px;
    background-color: #eaeaea;
    margin-right: 10px;
    margin-left: 10px;
`;

const StyledRegisterButton = styled.div`
    font-size: 15px;
    font-weight: 500;
    color: #272727;
    cursor: pointer;
    margin-right: 10px;
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
    @media screen and (max-width: ${720}px) {
        display: none;
    }
`;

const StyledContentBlock = styled.div`
    width: 100%;
`;

const StyledContentContainer = styled.div`
    display: flex;
    margin-top: 130px;
    z-index: 0;
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
    @media screen and (max-width: ${1900}px) {
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
    width: 1920px;
    height: 80px;
    background-color: white;
    @media screen and (max-width: ${1900}px) {
        padding-left: 10%;
        padding-right: 10%;
    }
    @media screen and (min-width: ${1900}px) {
        margin-left: 390px;
        margin-right: 390px;
    }
`;

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 100%;
`;

const StyledLoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #f5f5f5;
`;

const StyledSearchBaInput = styled.input`
    transition: width 1s linear;
    width: 270px;
    height: 40px;

    padding: 6px 0 4px 14px;
    border: solid 1px #e3e5ec;
    background-color: #f5f5f5;
`;

export default HeaderBar;
