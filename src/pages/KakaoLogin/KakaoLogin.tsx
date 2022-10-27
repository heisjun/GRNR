import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UserInfo } from 'recoil/auth';

const KakaoLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const KAKAO_CODE = location.search.split('=')[1];
    const accessToken2 = location.search.split('=')[1];
    const accessToken = accessToken2.replace('&refreshToken', '');
    const refreshToken = location.search.split('=')[2];
    const [loginStatus, setLoginStatus] = useRecoilState(UserInfo);

    const getToken = () => {
        if (accessToken) {
            localStorage.setItem('기존로그인accesstoken', accessToken);
            console.log('accessToken:', accessToken);
            localStorage.setItem('기존로그인refreshtoken', refreshToken);
            console.log('refreshToken:', refreshToken);
            setLoginStatus({ ...loginStatus, isLogin: true });
            navigate('./');
        } else return;
    };

    /* useEffect(() => {
        localStorage.clear();
        localStorage.setItem('token', String(params.token));
        window.location.replace('/');
    }, []);
    const removeItem = () => {
        localStorage.removeItem('token');
    };
 */
    useEffect(() => {
        getToken();
    }, []);

    return (
        <div>
            <div>인증중</div>
        </div>
    );
};

export default KakaoLogin;
