import styled from 'styled-components';
import { ItemList, MyphotoItem } from 'common/components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const Userphoto: React.FC = () => {
    const navigate = useNavigate();
    const [picData, setPicData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const myfeedData = await axios.get(
                    `${BASEURL}/api/account/${localStorage.getItem('userId')}/pictures`,
                    {
                        headers: {
                            Authorization: `Bearer ${TOKEN}`,
                        },
                    },
                );
                setPicData(myfeedData.data.value.content);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);
    return (
        <StyledScrapBookContainer>
            <StyledContextContainer>
                <StyledContexTitle>사진</StyledContexTitle>
                {picData.length !== 0 ? (
                    <ItemList
                        width="100%"
                        imgHeight="115%"
                        cols={4}
                        horizontalGap={2}
                        verticalGap={2}
                        items={picData}
                        RenderComponent={MyphotoItem}
                    />
                ) : (
                    <div>게시글이 존재하지 않습니다</div>
                )}
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

export default Userphoto;
