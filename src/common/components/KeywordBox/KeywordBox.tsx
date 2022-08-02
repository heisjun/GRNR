import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IKeywordBox } from './KeywordBox.type';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const maxWidth = Number(process.env.REACT_APP_MAX_WIDTH) + 100;

const KeywordBox: React.FC<IKeywordBox> = (props) => {
    const { setGetKeyword } = props;
    const sendKeyword = () => {
        setGetKeyword(currentItem);
    };

    const [currentTag, setCurrentTag] = useState<number[]>([]);
    const [currentItem, setCurrentItem] = useState<string[]>([]);

    const handleCurrentTag = (id: number, tagName: string) => {
        if (currentTag.includes(id)) {
            setCurrentTag((prev) => {
                const arr = [...prev];
                arr.splice(prev.indexOf(id), 1);
                return arr;
            });
            setCurrentItem((prev) => {
                const arr = [...prev];
                arr.splice(prev.indexOf(tagName), 1);
                return arr;
            });
        } else {
            setCurrentTag((prev) => [...prev, id]);
            setCurrentItem((prev) => [...prev, tagName]);
        }
    };
    useEffect(() => {
        sendKeyword();
    }, [currentItem]);

    return (
        <>
            <TagBox>
                {EXAMPLE.map((item) => {
                    const { id, tagName, keyword } = item;
                    return (
                        <div key={id}>
                            {currentTag.includes(id) ? (
                                <Tag key={id} onClick={() => handleCurrentTag(id, tagName)} color="lightgray">
                                    <StyledTagName>{tagName}</StyledTagName>
                                    <StyledKeyword>{keyword}</StyledKeyword>
                                </Tag>
                            ) : (
                                <Tag key={id} onClick={() => handleCurrentTag(id, tagName)} color="white">
                                    <StyledTagName>{tagName}</StyledTagName>
                                    <StyledKeyword>{keyword}</StyledKeyword>
                                </Tag>
                            )}
                        </div>
                    );
                })}
                <div>{currentItem}</div>
            </TagBox>
        </>
    );
};

const TagBox = styled.section`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
    margin-bottom: 10px;
    width: 100%;
`;

const Tag = styled.div<{ color: string }>`
    padding: 10%;
    border: 1px solid lightgray;
    text-align: center;
    cursor: pointer;
    transition: 1s;
    &:hover {
        background-color: lightgray;
    }
    background-color: ${(props) => props.color || 'white'};
`;

const StyledTagName = styled.div`
    color: grey;
    font-weight: bold;
    font-size: 1.4vw;
    margin-bottom: 5%;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 3vw;
    }
    @media screen and (min-width: ${maxWidth}px) {
        font-size: 15px;
    }
`;

const StyledKeyword = styled.div`
    color: grey;
    font-size: 1.2vw;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 2.6vw;
    }
    @media screen and (min-width: ${maxWidth}px) {
        font-size: 13px;
    }
`;
const EXAMPLE = [
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
];

export default KeywordBox;
