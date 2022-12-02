import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import FollowingItem from 'common/components/FollowingItem';
import { FadeIn, FadeOut } from 'common/keyframes';
import axios from 'axios';
import { IFollowingsParams } from 'common/types';
import { useRecoilValue } from 'recoil';
import { UserInfo } from 'recoil/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { headerItems, subTabBarItems } from 'navigations/data';
import { MypageDropdown, WritingDropdown } from 'common/components';
import { SubTabBar } from 'domains';

const maxWidth = process.env.REACT_APP_MAX_WIDTH;
const minWidth = process.env.REACT_APP_MIN_WIDTH;
const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = sessionStorage.getItem('accesstoken');
const Following: React.FC = () => {
    const [pageAnim, setPageAnim] = useState<any>(FadeIn);
    const [followings, setFollowings] = useState<IFollowingsParams[]>([]);
    const [loading, setLoading] = useState(false);

    const [scrollDownToggle, setScrollDownToggle] = useState<boolean>(false);
    const [fadeAnim, setFadeAnim] = useState<any>();
    const [subTabVisible, setSubTabVisible] = useState<boolean>(true);
    const [overPage, setOverPage] = useState<number>(0);
    const [crntPage, setCrntPage] = useState<number>(0);
    const [crntPath, setCrntPath] = useState<string>('');
    const [isActive, setIsActive] = useState(false);

    const { isLogin } = useRecoilValue(UserInfo);

    const loc = useLocation();
    const nav = useNavigate();

    useEffect(() => {
        if (!TOKEN) {
            window.location.replace('/login');
        } else {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`${BASEURL}/api/following`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${TOKEN}`,
                        },
                    });
                    setFollowings(response.data.value.content);
                } catch (e) {
                    console.log(e);
                }
                setLoading(false);
            };
            fetchData();
        }
    }, []);

    useEffect(() => {
        setPageAnim(FadeIn);
        return () => {
            setPageAnim(FadeOut);
        };
    }, []);

    return (
        <>
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
                                            color={item.link.split('/')[1] === crntPath ? '#0d6637' : '#0d6637'}
                                        >
                                            {item.name}
                                        </StyledMenuItemText>
                                    </Link>
                                </StyledMenuItemBlock>
                            ))}
                        </StyledMenuItemsContainer>
                        <StyledButtonsCotainer>
                            {isActive && <StyledSearchBaInput />}
                            <StyledSearchBar src={'/btnSearch.png'} onClick={() => setIsActive(!isActive)} />

                            <StyledSearchBar src={'/btnAlarm.png'} />
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
            <StyledFollowingContainer pageAnim={pageAnim}>
                {followings.map((i, index) => {
                    return <FollowingItem key={index} data={i} setFunc={setFollowings} items={followings} />;
                })}
            </StyledFollowingContainer>
        </>
    );
};

const StyledFollowingContainer = styled.div<{ pageAnim: any }>`
    padding-top: 40px;
    animation: ${({ pageAnim }) => pageAnim} 1s;
    animation-fill-mode: forwards;
    background-color: #f5f5f5;
`;

const StyledLogoImg = styled.img`
    width: 198px;
`;

const StyledSearchBar = styled.img`
    height: 30px;
    width: 30px;
    padding-right: 20px;
`;

const StyledSubTabBarBlock = styled.div`
    position: fixed;
    width: 100%;
    top: 80px;
    left: 0px;
    z-index: 1;
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
    @media screen and (max-width: ${boundaryWidth}px) {
        display: none;
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
    width: 1920px;
    height: 80px;
    background-color: white;
    @media screen and (max-width: ${maxWidth}px) {
        padding-left: 10%;
        padding-right: 10%;
    }
    @media screen and (min-width: ${maxWidth}px) {
        margin-left: 390px;
        margin-right: 390px;
    }
`;

const StyledSearchBaInput = styled.input`
    transition: width 1s linear;
    width: 270px;
    height: 40px;

    padding: 6px 0 4px 14px;
    border: solid 1px #e3e5ec;
    background-color: #f5f5f5;
`;

export default Following;
