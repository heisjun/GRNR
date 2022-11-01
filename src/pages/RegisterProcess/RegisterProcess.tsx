import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RegisterProcess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const accessToken2 = location.search.split('=')[1];
    const accessToken = accessToken2.replace('&refreshToken', '');
    const refreshToken = location.search.split('=')[2];

    const getToken = () => {
        if (accessToken) {
            localStorage.setItem('accesstoken', accessToken);
            localStorage.setItem('refreshtoken', refreshToken);
            navigate('/register');
        } else return;
    };

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
