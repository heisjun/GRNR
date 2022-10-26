import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UserInfo } from 'recoil/auth';

const REST_API_KEY = '71f42bf1f95027f6634775db92fac363';
const REDIRECT_URI = 'https://www.gardenersclub.co.kr/api/login/oauth2/code/kakao';
const REDIRECT_URI_AFTER_LOGIN = 'https://www.gardenersclub.co.kr/api/register';

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
        <StyledLoginContainer>
            <StyledLogoImg></StyledLogoImg>
            <img src="/kakao_login.png" style={{ width: '30%' }} onClick={handleLogin} />
            <StyledTitleText onClick={handleLogin}>카카오 계정으로 간편 로그인/회원가입</StyledTitleText>
            <StyledButton onClick={onTalkButton}>
                <StyledLoginText>TALK</StyledLoginText>
            </StyledButton>
        </StyledLoginContainer>
    );
};

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

const StyledLogoImg = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 100px;
    background-color: silver;
`;

const StyledTitleText = styled.div`
    font-size: 22px;
    font-weight: bold;
    color: grey;
    margin-top: 20px;
`;

const StyledLoginContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default Login;
