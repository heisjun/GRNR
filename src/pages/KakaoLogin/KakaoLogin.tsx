import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UserInfo } from 'recoil/auth';

const REST_API_KEY = '71f42bf1f95027f6634775db92fac363';
const REDIRECT_URI = 'https://www.gardenersclub.co.kr/api/login/oauth2/code/kakao';

const KakaoLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const KAKAO_CODE = location.search.split('=')[1];
    const [loginStatus, setLoginStatus] = useRecoilState(UserInfo);

    /* const getKakaoToken = () => {
        fetch(`https://kauth.kakao.com/oauth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `grant_type=authorization_code&clxient_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.access_token) {
                    console.log(data);
                    localStorage.setItem('token', data.access_token);
                    setLoginStatus({ ...loginStatus, isLogin: true });
                    navigate('/');
                } else {
                    navigate('./');
                }
            });
    };
 */
    const removeItem = () => {
        localStorage.removeItem('token');
    };

    /* useEffect(() => {
        getKakaoToken();
    }, []); */

    return (
        <div>
            <div>카카오 로그인중</div>
            <div onClick={removeItem}>지우기</div>
        </div>
    );
};

export default KakaoLogin;
