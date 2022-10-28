import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UserInfo } from 'recoil/auth';

const Logout: React.FC = () => {
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useRecoilState(UserInfo);
    const accessToken = localStorage.getItem('accesstoken');

    const getLogout = () => {
        if (accessToken) {
            console.log('로그아웃을 시도합니다.');
            localStorage.removeItem('accesstoken');
            localStorage.removeItem('refreshtoken');
            console.log('로그아웃이 완료됐습니다');
            setLoginStatus({ ...loginStatus, isLogin: false });
            navigate('/');
        } else {
            console.log('리턴');
            return;
        }
    };

    useEffect(() => {
        getLogout();
    }, []);

    return (
        <div>
            <div>로그아웃중,,</div>
        </div>
    );
};

export default Logout;
