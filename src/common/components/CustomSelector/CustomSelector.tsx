import React, { useState, useEffect, useRef } from 'react';

import { FaCaretDown } from 'react-icons/fa';
import styled from 'styled-components';
import { ICustomSelector } from './CustomSelector.type';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const CustomSelector: React.FC<ICustomSelector> = (props) => {
    const { optionData, setGetOption, value } = props;
    const [selected, setSelected] = useState(optionData[0].name);
    const [isActive, setIsActive] = useState([false]);
    const dropdownListRef = useRef<any>(null);
    const sendOption = () => {
        setGetOption(selected);
    };

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

    useEffect(() => {
        sendOption();
    }, [selected]);

    return (
        <StyledFiltersContainer>
            <StyledFiltersBlock>
                {optionData.map((item: any, index: number) => {
                    const { id, list } = item;
                    return (
                        <StyledDropdown key={id}>
                            <StyledDropdownBtn onClick={() => onOpenBtn(index)}>
                                <StyledDropdownText>{value ? value : selected}</StyledDropdownText>
                                <FaCaretDown />
                            </StyledDropdownBtn>
                            {isActive[index] && (
                                <StyledDropdownContent ref={dropdownListRef}>
                                    {list.map((option: any) => (
                                        <StyledContentItem
                                            key={option}
                                            onClick={() => {
                                                setSelected(option);
                                                onCloseBtn(index);
                                            }}
                                        >
                                            {option}
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

const StyledDropdown = styled.div`
    user-select: none;
    margin-right: 10px;
    position: relative;
`;

const StyledDropdownBtn = styled.div`
    padding: 5px;
    background: #fff;
    border: 1px solid lightgrey;
    font-weight: 400;
    color: gray;
    border-radius: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 15px;
    @media screen and (max-width: ${boundaryWidth}px) {
        padding: 3px;
    }
`;

const StyledDropdownText = styled.div`
    padding-right: 2px;
    font-size: 15px;
    @media screen and (max-width: ${boundaryWidth}px) {
    }
`;

const StyledDropdownContent = styled.div`
    position: absolute;
    top: 110%;
    left: 0;
    background: #fff;
    border: 1px solid lightgrey;
    font-weight: 300;
    color: #333;
    width: 130px;
    z-index: 10;
    font-size: 15px;
    @media screen and (max-width: ${boundaryWidth}px) {
    }
`;

const StyledContentItem = styled.div`
    padding: 10px;
    cursor: pointer;
    transition: all 0.2s;
    :hover {
        background: lightgray;
    }
`;

export default React.memo(CustomSelector);
