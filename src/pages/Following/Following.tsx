import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FollowingItem from 'common/components/FollowingItem';
import { FadeIn, FadeOut } from 'common/keyframes';
import axios from 'axios';
import { IFollowingsParams } from 'common/types';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const Following: React.FC = () => {
    const [pageAnim, setPageAnim] = useState<any>(FadeIn);
    const [followings, setFollowings] = useState<IFollowingsParams[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASEURL}/api/following`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TOKEN}`,
                    },
                });
                setFollowings(response.data.value.content);
                console.log(response.data.value.content);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        setPageAnim(FadeIn);
        return () => {
            setPageAnim(FadeOut);
        };
    }, []);

    return (
        <StyledFollowingContainer pageAnim={pageAnim}>
            <Link to="./keyword" style={{ textDecoration: 'none' }}>
                <StyledTItleText>관심있는 키워드를 설정해보세요! </StyledTItleText>
            </Link>
            {followings.map((i, index) => {
                return <FollowingItem key={index} data={i} />;
            })}
        </StyledFollowingContainer>
    );
};

const StyledFollowingContainer = styled.div<{ pageAnim: any }>`
    height: 2000px;
    animation: ${({ pageAnim }) => pageAnim} 1s;
    animation-fill-mode: forwards;
`;

const StyledTItleText = styled.div`
    font-size: 15px;
    font-weight: 600;
    color: gray;
    margin-bottom: 20px;
    display: inline-block;
`;

export default Following;
