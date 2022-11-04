import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UserInfo } from 'recoil/auth';

const REST_API_KEY = '71f42bf1f95027f6634775db92fac363';
const REDIRECT_URI = 'https://www.gardenersclub.co.kr/api/login/oauth2/code/kakao';
const REDIRECT_URI_AFTER_LOGIN = 'https://www.gardenersclub.co.kr/register';

const Login: React.FC = () => {
    const nav = useNavigate();

    const [loginStatus, setLoginStatus] = useRecoilState(UserInfo);
    const KAKAO_AUTH_URL = `https://www.gardenersclub.co.kr/api/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URI_AFTER_LOGIN}`;

    const handleLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    };

    const onTalkButton = () => {
        setLoginStatus({ ...loginStatus, isLogin: true });
        nav('/');
    };

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 10 }}>
            <StyledLoginContainer>
                <StyledLogoImg src="/Gardener.png" onClick={() => nav('/')} />
                <StyledBasicText> 지금 바로 간편하게</StyledBasicText>
                <StyledBasicText>가드너스 클럽에 가입해보세요</StyledBasicText>
                <img src="/kakao_login.png" style={{ width: 200, marginTop: 20 }} onClick={handleLogin} />
                <StyledButton onClick={onTalkButton}>
                    <StyledLoginText>로컬로그인</StyledLoginText>
                </StyledButton>
            </StyledLoginContainer>
        </div>
    );
};

const StyledBasicText = styled.div`
    font-size: 18px;
    color: #272727;
    margin-bottom: 5px;
`;
const StyledLoginText = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: white;
`;

const StyledButton = styled.div`
    width: 100px;
    height: 100px;
    margin-top: 20px;
    border-radius: 100px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: silver;
    &:hover {
        background-color: grey;
    }
`;

const StyledLogoImg = styled.img`
    width: 200px;
    padding-bottom: 100px;
`;

const StyledLoginContainer = styled.div`
    width: 420px;
    height: 500px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
`;

export default Login;
