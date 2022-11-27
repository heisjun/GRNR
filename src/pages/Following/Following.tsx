import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FollowingItem from 'common/components/FollowingItem';
import { FadeIn, FadeOut } from 'common/keyframes';
import axios from 'axios';
import { IFollowingsParams } from 'common/types';

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = sessionStorage.getItem('accesstoken');

const Following: React.FC = () => {
    const [pageAnim, setPageAnim] = useState<any>(FadeIn);
    const [followings, setFollowings] = useState<IFollowingsParams[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!TOKEN) {
            window.location.replace('/login');
        } else {
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
                } catch (e) {
                    console.log(e);
                }
                setLoading(false);
            };
            fetchData();
        }
    }, []);

    useEffect(() => {
        setPageAnim(FadeIn);
        return () => {
            setPageAnim(FadeOut);
        };
    }, []);

    return (
        <StyledFollowingContainer pageAnim={pageAnim}>
            {followings.map((i, index) => {
                return <FollowingItem key={index} data={i} setFunc={setFollowings} items={followings} />;
            })}
        </StyledFollowingContainer>
    );
};

const StyledFollowingContainer = styled.div<{ pageAnim: any }>`
    padding-top: 40px;
    animation: ${({ pageAnim }) => pageAnim} 1s;
    animation-fill-mode: forwards;
    background-color: #f5f5f5;
`;

export default Following;
