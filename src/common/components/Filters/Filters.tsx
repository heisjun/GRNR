import { useState, useEffect, useRef } from 'react';
import { IFilters } from './Filters.type';
import { FaCaretDown } from 'react-icons/fa';
import styled from 'styled-components';
import SelectedFilter from './SelectedFilter';

const DictionaryData = [
    {
        id: 1,
        name: '분류',
        list: ['입보기식물', '꽃보기식물', '열매보기식물', '선인장&다육식물'],
    },
    {
        id: 2,
        name: '광도',
        list: ['낮음', '중간', '높음'],
    },
    {
        id: 3,
        name: '습도',
        list: ['40%미만', '40~70%', '70%이상'],
    },
    {
        id: 4,
        name: '온도',
        list: ['10~15°C', '16~20°C', '21~25°C', '26~30°C'],
    },
    {
        id: 5,
        name: '관리레벨',
        list: ['초보자', '경험자', '전문가'],
    },
    {
        id: 6,
        name: '잎의무늬',
        list: ['줄무늬', '점무늬', '잎 가장자리 무늬', '기타'],
    },
    {
        id: 7,
        name: '장소',
        list: ['실내 어두운 곳', '거실 내측', '거실 창측', '발코니'],
    },
];

const Filters: React.FC<IFilters> = (props) => {
    const { selected, setSelected } = props;
    const [isActive, setIsActive] = useState([false]);
    const [currentItem, setCurrentItem] = useState<string[]>([]);
    const dropdownListRef = useRef<any>(null);

    //외부 영역 클릭시 드롭다운 비활성화
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
            setCurrentItem((prev) => {
                const arr = [...prev];
                arr.splice(prev.indexOf(option), 1);
                return arr;
            });
        } else {
            setCurrentItem((prev) => [...prev, option]);
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
    return (
        <StyledFiltersContainer>
            <StyledFiltersBlock>
                {DictionaryData.map((item, index) => {
                    const { id, name, list } = item;
                    return (
                        <StyledDropdown key={id}>
                            <StyledDropdownBtn onClick={() => onOpenBtn(index)}>
                                <div>{name}</div>
                                <FaCaretDown />
                            </StyledDropdownBtn>
                            {isActive[index] && (
                                <StyledDropdownContent ref={dropdownListRef}>
                                    {list.map((option) => (
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
            <SelectedFilter data={currentItem} setClear={setCurrentItem} />
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
    justify-content: space-between;
    cursor: pointer;
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
`;

const StyledContentItem = styled.div`
    padding: 10px;
    cursor: pointer;
    transition: all 0.2s;
    :hover {
        background: lightgray;
    }
`;

export default Filters;
