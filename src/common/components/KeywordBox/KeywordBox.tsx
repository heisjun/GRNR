import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IKeywordBox } from './KeywordBox.type';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const maxWidth = Number(process.env.REACT_APP_MAX_WIDTH) + 100;

const KeywordBox: React.FC<IKeywordBox> = (props) => {
    const { setGetKeyword, columns, data, gap } = props;
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
            <TagBox columns={columns} gap={gap}>
                {data.map((item: { id: any; tagName: any; keyword: any }) => {
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

const TagBox = styled.section<{ columns: number; gap: number }>`
    display: grid;
    grid-template-columns: repeat(${(props) => props.columns}, 1fr);
    gap: ${(props) => props.gap}px;
    width: 100%;
`;

const Tag = styled.div<{ color: string }>`
    padding: 10%;
    border: 1px solid lightgray;
    text-align: center;
    cursor: pointer;
    transition: 1s;
    padding-top: 20%;
    padding-bottom: 20%;

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

export default KeywordBox;
