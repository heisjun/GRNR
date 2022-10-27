import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UserInfo } from 'recoil/auth';

const RegisterProcess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const accessToken2 = location.search.split('=')[1];
    const accessToken = accessToken2.replace('&refreshToken', '');
    const refreshToken = location.search.split('=')[2];
    const [loginStatus, setLoginStatus] = useRecoilState(UserInfo);

    const getToken = () => {
        if (accessToken) {
            localStorage.setItem('회원가입accesstoken', accessToken);
            console.log('accessToken:', accessToken);
            localStorage.setItem('회원가입refreshtoken', refreshToken);
            console.log('refreshToken:', refreshToken);
            setLoginStatus({ ...loginStatus, isLogin: true });
            navigate('/register');
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
            <div>회원가입으로 처리</div>
        </div>
    );
};

export default RegisterProcess;
