import styled from 'styled-components';
import { ItemList, MyphotoItem } from 'common/components';
import { Profile } from 'domains';
import { IMyphotoParams } from 'common/types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = sessionStorage.getItem('accesstoken');

const Myphoto: React.FC = () => {
    const navigate = useNavigate();
    const [picData, setPicData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const myfeedData = await axios.get(
                    `${BASEURL}/api/account/${sessionStorage.getItem('accountId')}/pictures`,
                    {
                        headers: {
                            Authorization: `Bearer ${TOKEN}`,
                        },
                    },
                );
                setPicData(myfeedData.data.value.content);
                console.log(myfeedData.data.value.content);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);
    return (
        <StyledScrapBookContainer>
            {/*  <StyledProfileContainer>
                <Profile />
                <div>
                    <StyledFeedNav onClick={() => navigate('/mypage')}>나의피드</StyledFeedNav>
                    <StyledFeedNav nav={true} onClick={() => navigate('/mypage/profile/photo')}>
                        사진
                    </StyledFeedNav>
                    <StyledFeedNav>매거진</StyledFeedNav>
                    <StyledFeedNav>Q&A</StyledFeedNav>
                    <StyledFeedNav>스크랩북</StyledFeedNav>
                    <StyledFeedNav>좋아요</StyledFeedNav>
                    <StyledFeedNav>설정</StyledFeedNav>
                </div>
            </StyledProfileContainer> */}
            <StyledContextContainer>
                <StyledContexTitle>사진</StyledContexTitle>
                <ItemList
                    width="100%"
                    imgHeight="115%"
                    cols={4}
                    horizontalGap={2}
                    verticalGap={2}
                    items={picData}
                    RenderComponent={MyphotoItem}
                />
            </StyledContextContainer>
        </StyledScrapBookContainer>
    );
};

const StyledFeedNav = styled.div<{ nav?: boolean }>`
    box-sizing: border-box;
    width: 280px;
    height: 60px;
    padding: 18px 0px 18px 14px;
    font-size: 16px;
    font-weight: 500;
    color: ${({ nav }) => (nav ? '#0d6637;' : '#272727')};
    background-color: ${({ nav }) => (nav ? '#e7f5ee;' : 'white')};
    cursor: pointer;
`;

const StyledProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 280px;
    height: 1000px;
    background-color: white;
    margin-right: 64px;
`;

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

export default Myphoto;
