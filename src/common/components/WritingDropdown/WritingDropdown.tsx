import React, { useState, useEffect, useRef } from 'react';

import { FaPen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const WritingDropdown: React.FC = () => {
    const navigate = useNavigate();
    const option = [
        {
            id: 1,
            list: [
                { name: '사진/동영상 올리기', url: '/upload' },
                { name: '매거진 글쓰기', url: '' },
                { name: '질문하기', url: '' },
            ],
        },
    ];
    const [isActive, setIsActive] = useState([false]);
    const dropdownListRef = useRef<any>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent): void {
            if (dropdownListRef.current && !dropdownListRef.current.contains(e.target as Node)) {
                setIsActive([false]);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownListRef]);

    function onOpenBtn(index: number) {
        const newIsActive = [...isActive];
        newIsActive[index] = true;
        setIsActive(newIsActive);
    }

    function onCloseBtn(index: number) {
        const newIsActive = [...isActive];
        newIsActive[index] = false;
        setIsActive(newIsActive);
    }

    return (
        <StyledFiltersContainer>
            <StyledFiltersBlock>
                {option.map((item: any, index: number) => {
                    const { id, list } = item;
                    return (
                        <StyledDropdown key={id}>
                            <StyledDropdownBtn onClick={() => onOpenBtn(index)}>
                                <StyledDropdownText>글쓰기</StyledDropdownText>
                                <StyledWriteIcon src={'/btnWrite.png'} />
                            </StyledDropdownBtn>
                            {isActive[index] && (
                                <StyledDropdownContent ref={dropdownListRef}>
                                    {list.map((option: any) => (
                                        <StyledContentItem
                                            key={option.name}
                                            onClick={() => {
                                                navigate(option.url);
                                            }}
                                        >
                                            {option.name}
                                        </StyledContentItem>
                                    ))}
                                </StyledDropdownContent>
                            )}
                        </StyledDropdown>
                    );
                })}
            </StyledFiltersBlock>
        </StyledFiltersContainer>
    );
};

const StyledFiltersContainer = styled.div``;

const StyledFiltersBlock = styled.div`
    display: flex;
`;

const StyledWriteIcon = styled.img`
    height: 20px;
    width: 20px;
`;

const StyledDropdown = styled.div`
    user-select: none;
    margin-right: 10px;
    position: relative;
`;

const StyledDropdownBtn = styled.div`
    padding: 9px 12px 9px 12px;
    background: #0d6637;
    font-weight: 500;
    color: white;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 15px;
    @media screen and (max-width: ${boundaryWidth}px) {
        padding: 3px;
    }
`;

const StyledDropdownText = styled.div`
    padding-right: 8px;
    font-size: 15px;
    @media screen and (max-width: ${boundaryWidth}px) {
    }
`;

const StyledDropdownContent = styled.div`
    position: absolute;
    top: 110%;
    right: -50%;
    background: #fff;
    border: 1px solid lightgrey;
    font-weight: 300;
    color: #333;
    width: 150px;
    z-index: 10;
    font-size: 15px;
    @media screen and (max-width: ${boundaryWidth}px) {
    }
`;

const StyledContentItem = styled.div`
    font-weight: 400;
    padding: 15px;
    cursor: pointer;
    transition: all 0.2s;
    :hover {
        background: lightgray;
    }
`;

export default React.memo(WritingDropdown);
