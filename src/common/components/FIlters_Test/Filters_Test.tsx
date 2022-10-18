import { useState, useEffect, useRef } from 'react';
import { IFilters_Test } from './Filters.type';
import { FaCaretDown } from 'react-icons/fa';
import styled from 'styled-components';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const Filters_Test: React.FC<IFilters_Test> = (props) => {
    const { setGetFilter, data } = props;
    const [selected, setSelected] = useState('');
    const [isActive, setIsActive] = useState([false]);
    const [currentItem, setCurrentItem] = useState('');
    const dropdownListRef = useRef<any>(null);
    const sendFilter = () => {
        setGetFilter(selected);
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

    const handleCurrentTag = (option: string) => {
        if (currentItem.includes(option)) {
            setCurrentItem('');
        } else {
            setCurrentItem(option);
        }
    };

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
        sendFilter();
    }, [currentItem]);
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
                                                handleCurrentTag(option);
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
            {/* <SelectedFilter data={selected} setClear={setSelected} /> */}
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
        font-size: 1.5vw;
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
        font-size: 1.5vw;
        width: 100px;
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

export default Filters_Test;
