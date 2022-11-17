import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { UserInfo } from 'recoil/auth';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const MypageDropdown: React.FC = () => {
    interface Iprofile {
        accountId: number;
        nickName: string;
        address: string;
        homePage: null;
        selfInfo: null;
        profileUrl: string;
    }

    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useRecoilState(UserInfo);
    const [profile, setProfile] = useState<Iprofile>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pictureData = await axios.get(`${BASEURL}/api/picture/view`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });
                setProfile(pictureData.data.value);
                console.log(pictureData.data.value);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    const logout = async () => {
        try {
            const data = await axios.get(`${BASEURL}/api/logout`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            localStorage.removeItem('accesstoken');
            localStorage.removeItem('refreshtoken');
            sessionStorage.clear();
            setLoginStatus({ ...loginStatus, isLogin: false });
            window.location.replace('/');
        } catch (e) {
            console.log(e);
        }
    };

    const option = [
        {
            id: 1,
            list: [
                { name: '마이페이지', url: '/mypage' },
                { name: '로그아웃', url: '' },
            ],
        },
    ];
    const [isActive, setIsActive] = useState([false]);
    const dropdownListRef = useRef<any>(null);

    console.log(profile?.profileUrl);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent): void {
            if (dropdownListRef.current && !dropdownListRef.current.contains(e.target as Node)) {
                setIsActive([false]);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownListRef]);

    function onOpenBtn(index: number) {
        const newIsActive = [...isActive];
        newIsActive[index] = true;
        setIsActive(newIsActive);
    }

    return (
        <StyledFiltersContainer>
            <StyledFiltersBlock>
                {option.map((item: any, index: number) => {
                    const { id, list } = item;
                    return (
                        <StyledDropdown key={id}>
                            <StyledDropdownBtn
                                onClick={() => onOpenBtn(index)}
                                src={profile ? `${sessionStorage.getItem('profileUrl')}` : '/avatar.png'}
                            />
                            {isActive[index] && (
                                <StyledDropdownContent ref={dropdownListRef}>
                                    {list.map((option: any) => (
                                        <StyledContentItem
                                            key={option.name}
                                            onClick={() => {
                                                option.url === '/mypage' ? navigate(option.url) : logout();
                                            }}
                                        >
                                            {option.name}
                                        </StyledContentItem>
                                    ))}
                                </StyledDropdownContent>
                            )}
                        </StyledDropdown>
                    );
                })}
            </StyledFiltersBlock>
        </StyledFiltersContainer>
    );
};

const StyledFiltersContainer = styled.div``;

const StyledFiltersBlock = styled.div`
    display: flex;
`;

const StyledDropdown = styled.div`
    user-select: none;
    margin-right: 10px;
    position: relative;
`;

const StyledDropdownBtn = styled.img`
    background: #fff;
    border: 1px solid lightgrey;
    height: 30px;
    width: 30px;
    color: gray;
    border-radius: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 15px;
    @media screen and (max-width: ${boundaryWidth}px) {
        padding: 3px;
    }
    :hover {
        background-color: gray;
        color: white;
    }
`;

const StyledDropdownContent = styled.div`
    position: absolute;
    top: 110%;
    right: -200%;
    background: #fff;
    border: 1px solid lightgrey;
    font-weight: 300;
    color: #333;
    width: 150px;
    z-index: 10;
    font-size: 15px;
    @media screen and (max-width: ${boundaryWidth}px) {
    }
`;

const StyledContentItem = styled.div`
    font-weight: 400;
    padding: 15px;
    cursor: pointer;
    transition: all 0.2s;
    :hover {
        background: lightgray;
    }
`;

export default React.memo(MypageDropdown);
