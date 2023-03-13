import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Footer: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div>
            <StyledFooterContainer>
                <StyledFooterLogo src={'/footerLogo.png'} />
                <StyledTextBlock>
                    <StyledMiddleText onClick={() => navigate('/privacy')}>고객이용 약관</StyledMiddleText>
                    <StyledMiddleText>개인정보처리방침</StyledMiddleText>
                </StyledTextBlock>
                <StyledSmallTextBlock>
                    <StyledSmallText>(주) 주식회사명 (대표: 가나다)</StyledSmallText>
                    <StyledBoundary> |</StyledBoundary>
                    <StyledSmallText>서울특별시 송파구 올림픽로 300 롯</StyledSmallText>
                    <StyledBoundary> |</StyledBoundary>
                    <StyledSmallText>통신판매번호: 2022-서울송파-07</StyledSmallText>
                </StyledSmallTextBlock>
                <StyledSmallTextBlock>
                    <StyledSmallText>유료직업소개사업등록번호: (국내) 제2022-1234567-89-0-12345호</StyledSmallText>
                    <StyledBoundary> |</StyledBoundary>
                    <StyledSmallText> (국외) 서울동부-유-2022-1</StyledSmallText>
                    <StyledBoundary> |</StyledBoundary>
                    <StyledSmallText>사업자등록번호: 000-12-34567</StyledSmallText>
                </StyledSmallTextBlock>
            </StyledFooterContainer>
        </div>
    );
};

const StyledFooterContainer = styled.div`
    height: 260px;
    min-width: 1140px;
    background-color: #494949;
    padding-top: 60px;
    padding-left: 20%;
`;

const StyledFooterLogo = styled.img`
    height: 26px;
    width: 198px;
    margin-bottom: 27px;
`;

const StyledMiddleText = styled.div`
    font-size: 14px;
    color: #ffffff;
    padding-right: 20px;
    opacity: 0.56;
    cursor: pointer;
`;

const StyledSmallText = styled.div`
    font-size: 12px;
    color: #ffffff;
    opacity: 0.56;
`;

const StyledBoundary = styled.div`
    font-size: 12px;
    color: #ffffff;
    padding-left: 10px;
    padding-right: 10px;
    opacity: 0.56;
`;

const StyledTextBlock = styled.div`
    display: flex;
    margin-bottom: 23px;
`;
const StyledSmallTextBlock = styled.div`
    display: flex;
    margin-bottom: 3px;
`;
export default Footer;
