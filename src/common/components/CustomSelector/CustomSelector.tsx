import React, { useState, useEffect, useRef } from 'react';

import { FaCaretDown } from 'react-icons/fa';
import styled from 'styled-components';
import { ICustomSelector } from './CustomSelector.type';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const CustomSelector: React.FC<ICustomSelector> = (props) => {
    const { optionData, setGetOption, value } = props;
    function convertKor(place: string) {
        if (place === '원룸' || place === 'ONE_ROOM') {
            return '원룸';
        } else if (place === '거실' || place === 'LIVING_ROOM') {
            return '거실';
        } else if (place === '침실' || place === 'BEDROOM') {
            return '침실';
        } else if (place === '주방' || place === 'KITCHEN') {
            return '주방';
        } else if (place === '발코니' || place === 'VERANDA_BALCONY') {
            return '발코니';
        } else if (place === '사무실' || place === 'OFFICE') {
            return '사무실';
        } else if (place === '가게' || place === 'STORE') {
            return '가게';
        } else if (place === '야외' || place === 'OUTDOOR') {
            return '야외';
        }
    }
    const [selected, setSelected] = useState(value ? convertKor(value) : optionData[0].name);
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
                                <StyledDropdownText>{selected}</StyledDropdownText>
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
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 81px;
    height: 38px;
    padding: 0px 14px;
    background-color: #f4f4f4;
`;

const StyledDropdownText = styled.div`
    font-family: NotoSansKR;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #2a2a2a;
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
