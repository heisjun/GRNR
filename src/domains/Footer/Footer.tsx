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
                    <StyledSmallText>(주) 가드너스클럽 (대표: 서원재)</StyledSmallText>
                    <StyledBoundary> |</StyledBoundary>
                    <StyledSmallText>세종특별자치시 나성북1로 22, 8층 803-78호(나성동, 디펠리체)</StyledSmallText>
                </StyledSmallTextBlock>
                <StyledSmallTextBlock>
                    <StyledSmallText>사업자등록번호: 102-87-02659</StyledSmallText>
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
    @media screen and (max-width: ${1900}px) {
        padding-left: 10%;
        padding-right: 10%;
    }
    @media screen and (min-width: ${1900}px) {
        padding-left: 390px;
        padding-right: 390px;
    }
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
