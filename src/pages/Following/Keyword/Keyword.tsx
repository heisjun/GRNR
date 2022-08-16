import React, { useState } from 'react';
import styled from 'styled-components';
import KeywordBox from 'common/components/KeywordBox';

const KeywordData = [
    {
        id: 1,
        tagName: '키워드1',
        keyword: '#키워드 #키워드 #키워드',
    },
    {
        id: 2,
        tagName: '키워드2',
        keyword: '#키워드 #키워드 #키워드',
    },
    {
        id: 3,
        tagName: '키워드3',
        keyword: '#키워드 #키워드 #키워드',
    },
    {
        id: 4,
        tagName: '키워드4',
        keyword: '#키워드 #키워드 #키워드',
    },
    {
        id: 5,
        tagName: '키워드5',
        keyword: '#키워드 #키워드 #키워드',
    },
    {
        id: 6,
        tagName: '키워드6',
        keyword: '#키워드 #키워드 #키워드',
    },
    {
        id: 7,
        tagName: '키워드7',
        keyword: '#키워드 #키워드 #키워드',
    },
    {
        id: 8,
        tagName: '키워드8',
        keyword: '#키워드 #키워드 #키워드',
    },
    {
        id: 9,
        tagName: '키워드9',
        keyword: '#키워드 #키워드 #키워드',
    },
];

const Keyword: React.FC = () => {
    const [getkeyword, setGetkeyword] = useState();

    return (
        <StyledKeywordContainer>
            <StyledTItleText>관심사를 알려주세요</StyledTItleText>
            <KeywordBox data={KeywordData} setGetKeyword={setGetkeyword} columns={3} gap={20} />
        </StyledKeywordContainer>
    );
};

const StyledKeywordContainer = styled.div`
    height: 5000px;
`;

const StyledTItleText = styled.div`
    width: 100%;
    text-align: center;
    padding: 20px;
    font-size: 23px;
    font-weight: 600;
    color: gray;
`;
export default Keyword;
