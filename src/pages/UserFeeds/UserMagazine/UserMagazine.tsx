import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = sessionStorage.getItem('accesstoken');

const UserMagazine: React.FC = () => {
    const navigate = useNavigate();
    const [picData, setPicData] = useState([]);

    return (
        <StyledScrapBookContainer>
            <StyledContextContainer>
                <StyledContexTitle>매거진</StyledContexTitle>
                <div>게시글이 존재하지 않습니다</div>
            </StyledContextContainer>
        </StyledScrapBookContainer>
    );
};

const StyledContextContainer = styled.div`
    width: 796px;
`;

const StyledContexTitle = styled.div`
    font-family: NotoSansKR;
    font-size: 30px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #272727;
    margin-bottom: 30px;
`;

const StyledScrapBookContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export default UserMagazine;
