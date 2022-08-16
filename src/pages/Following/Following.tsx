import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FollowingItem from 'common/components/FollowingItem';

const EXAMPLE = [
    {
        nickname: 'jun',
        time: '2시간전',
        picUrl: ['1', '2', '3'],
        text: [
            '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라만세 무궁화 삼천리 화려강산, 대한사람 대한으로 길이 보전하세',
            'text2',
            'text3',
        ],
        views: 312231,
        like: 123,
        bookmark: 192,
    },
    {
        nickname: 'tamin',
        time: '49분전',
        picUrl: ['1', '2', '3', '4'],
        text: [
            'tamin Writing',
            '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라만세 무궁화 삼천리 화려강산, 대한사람 대한으로 길이 보전하세',
            'text2',
            'text3',
        ],
        views: 31,
        like: 10,
        bookmark: 12,
    },
];

const Question: React.FC = () => {
    return (
        <StyledFollowingContainer>
            <Link to="./keyword" style={{ textDecoration: 'none' }}>
                <StyledTItleText>관심있는 키워드를 설정해보세요! </StyledTItleText>
            </Link>
            {EXAMPLE.map((i, index) => {
                return <FollowingItem key={index} data={i} />;
            })}
        </StyledFollowingContainer>
    );
};

const StyledFollowingContainer = styled.div`
    height: 2000px;
`;

const StyledTItleText = styled.div`
    font-size: 15px;
    font-weight: 600;
    color: gray;
    margin-bottom: 20px;
    display: inline-block;
`;

export default Question;
