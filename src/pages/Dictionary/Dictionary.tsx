import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ItemList, DictionaryItem, Filter_usedHook } from 'common/components';
import { FadeIn, FadeOut } from 'common/keyframes';
import axios from 'axios';
import { IDictionariesParams } from 'common/types';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import DictionaryBanner from 'common/components/DictionaryBanner';
import { useInView } from 'react-intersection-observer';

const dictionaryFilter = [
    [
        {
            id: 0,
            name: '분류',
            engName: 'classification',
            list: ['잎보기식물', '꽃보기식물', '열매보기식물', '선인장,다육식물'],
        },
    ],
    [
        {
            id: 1,
            name: '형태',
            engName: 'shape',
            list: ['관목형', '직립형', '덩굴형', '잔디형', '로제트형', '다육형'],
        },
    ],
    [
        {
            id: 2,
            name: '관리 난이도',
            engName: 'difficulty',
            list: ['초급자용', '중급자용', '상급자용'],
        },
    ],
    [
        {
            id: 3,
            name: '특성',
            engName: 'growSpeed',
            list: ['빠르게 자라는', '느리게 자라는'],
        },
    ],
    [
        {
            id: 4,
            name: '독성',
            engName: 'toxicity',
            list: ['무해한', '심각한 독성', '경미한 독성', '섭취 주의', '발진 주의'],
        },
    ],
    [
        {
            id: 5,
            name: '강아지',
            engName: 'dog',
            list: ['강아지-안전한', '강아지 주의'],
        },
    ],
    [
        {
            id: 6,
            name: '고양이',
            engName: 'cat',
            list: ['고양이-안전한', '고양이 주의'],
        },
    ],
];

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const maxWidth = process.env.REACT_APP_MAX_WIDTH;

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const Dictionary: React.FC = () => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const url = location.search;
    const queryKey = Array.from(searchParams);

    const [observerRef, observerInview] = useInView();
    const [size, setSize] = useState(12);
    const [magazineCols, setMagazineCols] = useState(window.innerWidth > Number(boundaryWidth) ? 3 : 3);
    const [magazineGap, setMagazineGap] = useState(window.innerWidth > Number(boundaryWidth) ? 1 : 6);
    const [magazineVerticalGap, setMagazineVerticalGap] = useState(window.innerWidth > Number(boundaryWidth) ? 40 : 4);
    const [pageAnim, setPageAnim] = useState<any>(FadeIn);
    const [dictionaries, setDictionaries] = useState<IDictionariesParams[]>([]);

    const deleteFilterData = (option: string) => {
        searchParams.delete(option);
        setSearchParams(searchParams);
    };

    const onReset = () => {
        setSearchParams({});
    };

    useEffect(() => {
        setPageAnim(FadeIn);
        return () => {
            setPageAnim(FadeOut);
        };
    }, []);

    useEffect(() => {
        if (observerInview) {
            setSize((prev) => prev + 12);
            fetchData();
        }
    }, [observerInview]);

    const fetchData = async () => {
        if (!TOKEN) {
            try {
                const response = await axios.get(`${BASEURL}/api/plantDic/search${url}`, {
                    params: {
                        page: 0,
                        size: size,
                    },
                });
                setDictionaries(response.data.value.content);
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                const response = await axios.get(`${BASEURL}/api/plantDic/search${url}`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                    params: {
                        page: 0,
                        size: size,
                    },
                });
                setDictionaries(response.data.value.content);
            } catch (e) {
                console.log(e);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    return (
        <StyledDictionaryContainer pageAnim={pageAnim}>
            <div style={{ width: 1140, margin: 'auto' }}>
                {dictionaries && <DictionaryBanner data={dictionaries} />}
                <StyledLine />
                <StyledDictionaryHeader>
                    {dictionaryFilter.map((data) => {
                        return (
                            <Filter_usedHook
                                data={data}
                                setSearchParams={setSearchParams}
                                searchParams={searchParams}
                            />
                        );
                    })}
                </StyledDictionaryHeader>
                <div style={{ display: 'flex', paddingBottom: 20 }}>
                    {queryKey.map((item, idx) => {
                        return (
                            <StyledSelected>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {item[1]}
                                    <FaTimes
                                        onClick={() => {
                                            deleteFilterData(item[0]);
                                        }}
                                    />
                                </div>
                            </StyledSelected>
                        );
                    })}

                    {queryKey.length !== 0 && <StyledSelected onClick={onReset}>초기화</StyledSelected>}
                </div>

                {dictionaries ? (
                    <>
                        <ItemList
                            width="100%"
                            imgHeight="120%"
                            cols={magazineCols}
                            horizontalGap={magazineGap}
                            verticalGap={magazineVerticalGap}
                            items={dictionaries}
                            RenderComponent={DictionaryItem}
                            setFunc={setDictionaries}
                        />
                        <div ref={observerRef} />
                    </>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', height: 400, alignItems: 'center' }}>
                        <div style={{ fontSize: 18, fontWeight: 400 }}>찾으시는 결과가 없습니다!</div>
                    </div>
                )}
            </div>
        </StyledDictionaryContainer>
    );
};

const StyledLine = styled.div`
    width: 1140px;
    height: 1px;
    margin: 15px 0px 40px 0px;
    background-color: #ececec;
`;

const StyledDictionaryHeader = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const StyledDictionaryContainer = styled.div<{ pageAnim: any }>`
    animation: ${({ pageAnim }) => pageAnim} 1s;
    animation-fill-mode: forwards;
    display: flex;
    flex-direction: column;
    align-items: center;
    /*    @media screen and (max-width: ${maxWidth}px) {
        padding-left: 20%;
        padding-right: 20%;
    }
    @media screen and (min-width: ${maxWidth}px) {
        margin-left: 390px;
        margin-right: 390px;
    } */
`;

const StyledSelected = styled.div`
    background: gray;
    color: white;
    margin-right: 5px;
    margin-top: 7px;
    padding: 7px 7px 7px 7px;
    font-size: 14px;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 1.5vw;
    }
    cursor: pointer;
`;
export default React.memo(Dictionary);
