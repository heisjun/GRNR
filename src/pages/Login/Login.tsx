import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UserInfo } from 'recoil/auth';

const REDIRECT_URI_AFTER_LOGIN = 'https://www.gardenersclub.co.kr/register';

const Login: React.FC = () => {
    const nav = useNavigate();

    const [loginStatus, setLoginStatus] = useRecoilState(UserInfo);
    const KAKAO_AUTH_URL = `https://www.gardenersclub.co.kr/api/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URI_AFTER_LOGIN}`;
    const NAVER_AUTH_URL = `https://www.gardenersclub.co.kr/api/login/oauth2/code/naver`;

    const handleLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    };

    const handleNaverLogin = () => {
        window.location.href = NAVER_AUTH_URL;
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
                <StyledBasicText>
                    <p style={{ fontWeight: 'bold', color: '#043935' }}>가드너스 클럽</p>
                    <p>에 가입해보세요</p>
                </StyledBasicText>
                <StyledLoginImg src="/kakao_login.png" onClick={handleLogin} />
                <StyledLoginImg src="/naver_login.png" onClick={handleNaverLogin} />
                <StyledButton onClick={onTalkButton}>
                    <StyledLoginText>로컬로그인</StyledLoginText>
                </StyledButton>
            </StyledLoginContainer>
        </div>
    );
};

const StyledLoginImg = styled.img`
    width: 200px;
    margin-top: 20px;
    cursor: pointer;
    :hover {
        opacity: 0.9;
    }
`;

const StyledBasicText = styled.div`
    font-size: 18px;
    color: #272727;
    display: flex;
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
    width: 210px;
    padding-bottom: 50px;
`;

const StyledLoginContainer = styled.div`
    margin-top: 108px;
    margin-bottom: 88px;
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
