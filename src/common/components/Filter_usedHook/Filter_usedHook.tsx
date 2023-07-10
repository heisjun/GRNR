import { useState, useEffect, useRef } from 'react';
import { IFilters_usedHook } from './Filter_usedHook.type';
import { FaCaretDown } from 'react-icons/fa';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const Filters_usedHook: React.FC<IFilters_usedHook> = (props) => {
    const { data, setSearchParams, searchParams } = props;
    const [isActive, setIsActive] = useState([false]);
    const location = useLocation();
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

    const setSortParams = (option: string) => {
        const encodeOption = encodeURIComponent(option);
        if (location.search.includes(encodeOption)) {
            searchParams.delete(data[0].engName);
            setSearchParams(searchParams);
        } else {
            searchParams.set(data[0].engName, option);
            setSearchParams(searchParams);
        }
    };

    return (
        <StyledFiltersContainer>
            <StyledFiltersBlock>
                {data.map((item, index) => {
                    const { id, name, list } = item;
                    return (
                        <StyledDropdown key={id}>
                            <StyledDropdownBtn onClick={() => onOpenBtn(index)}>
                                <StyledDropdownText>{name}</StyledDropdownText>
                                <FaCaretDown />
                            </StyledDropdownBtn>
                            {isActive[index] && (
                                <StyledDropdownContent ref={dropdownListRef}>
                                    {list.map((option: any) => (
                                        <StyledContentItem
                                            key={option}
                                            onClick={() => {
                                                setSortParams(option);
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
    padding: 8px 10px 10px 14px;
    background-color: #f4f4f4;
    font-weight: 400;
    color: gray;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 15px;
`;

const StyledDropdownText = styled.div`
    padding-right: 2px;
    color: #2a2a2a;
    font-size: 15px;
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
`;

const StyledContentItem = styled.div`
    padding: 10px;
    cursor: pointer;
    transition: all 0.2s;
    :hover {
        background: lightgray;
    }
`;

export default Filters_usedHook;
