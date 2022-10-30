import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UserInfo } from 'recoil/auth';

const KakaoLogin = () => {
    const location = useLocation();
    const accessToken2 = location.search.split('=')[1];
    const accessToken = accessToken2.replace('&refreshToken', '');
    const refreshToken = location.search.split('=')[2];
    const [loginStatus, setLoginStatus] = useRecoilState(UserInfo);

    useEffect(() => {
        const getToken = async () => {
            try {
                localStorage.setItem('accesstoken', accessToken);
                localStorage.setItem('refreshtoken', refreshToken);
                setLoginStatus({ ...loginStatus, isLogin: true });
                window.location.replace('/');
            } catch (e) {
                console.log(e);
            }
        };
        getToken();
    }, []);

    return (
        <div>
            <div>인증중</div>
        </div>
    );
};

export default KakaoLogin;
