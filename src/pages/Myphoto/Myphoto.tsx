import styled from 'styled-components';
import { ItemList, MyphotoItem } from 'common/components';
import { Profile } from 'domains';
import { IMyphotoParams } from 'common/types';
import { useEffect, useState } from 'react';
import axios from 'axios';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const Myphoto: React.FC = () => {
    const [picData, setPicData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const myfeedData = await axios.get(
                    `${BASEURL}/api/account/${sessionStorage.getItem('accountId')}/pictures`,
                    {
                        headers: {
                            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzbnNJZCI6IjIzMjIyMzg1MjAiLCJleHAiOjE2NjgzNTE1NzV9.1QkxEO1geb4YGJzpkIacpypKbnryDQJYNVOrzGXfj-GxSTvhPZrPaQdmMkEjejiDn8dpuz9aAVzEpr9nFT6hbw`,
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
        <StyledMyphotoContainer>
            <StyledProfileContainer>
                <StyledProfileBlock>
                    <Profile />
                </StyledProfileBlock>
            </StyledProfileContainer>
            <StyledContextContainer>
                <StyledTitleBlock>
                    <StyledTitleText>사진</StyledTitleText>
                    <StyledTitleNumber>{picData.length}</StyledTitleNumber>
                </StyledTitleBlock>
                <ItemList
                    width="100%"
                    imgHeight="115%"
                    cols={3}
                    horizontalGap={4}
                    verticalGap={2}
                    items={picData}
                    RenderComponent={MyphotoItem}
                />
            </StyledContextContainer>
        </StyledMyphotoContainer>
    );
};

const StyledTitleText = styled.div`
    font-size: 15px;
    font-weight: bold;
    color: grey;
`;

const StyledTitleNumber = styled.div`
    font-size: 15px;
    font-weight: bold;
    color: silver;
    margin-left: 5px;
`;

const StyledTitleBlock = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 10px;
`;

const StyledProfileBlock = styled.div`
    position: relative;
    width: 85%;
    padding-bottom: 150%;
`;

const StyledProfileContainer = styled.div`
    width: 25%;
`;

const StyledContextContainer = styled.div`
    width: 73%;
    height: 5000px;
    margin-left: 2%;
`;

const StyledMyphotoContainer = styled.div`
    margin-top: 40px;
    width: 100%;
    display: flex;
`;

export default Myphoto;
