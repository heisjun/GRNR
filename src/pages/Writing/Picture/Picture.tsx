import CustomSelector from 'common/components/CustomSelector';
import WritingItem from 'common/components/WritingItem';
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { IUploadPicData } from 'common/types';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const maxWidth = process.env.REACT_APP_MAX_WIDTH;
const minWidth = process.env.REACT_APP_MIN_WIDTH;

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = localStorage.getItem('accesstoken');

const option1 = [
    {
        id: 1,
        name: '분류',
        list: ['입보기식물', '꽃보기식물', '열매보기식물', '선인장&다육식물'],
    },
];
const option2 = [
    {
        id: 1,
        name: '장소',
        list: ['실내 어두운 곳', '거실 내측', '거실 창측', '발코니'],
    },
];

const Picture: React.FC = () => {
    const navigate = useNavigate();
    const [getOption1, setGetOption1] = useState('');
    const [getOption2, setGetOption2] = useState('');
    const [imgFiles, setImgFiles] = useState<{ imgfile: any }[]>([]);
    const [saveDto, setSaveDto] = useState<
        {
            explain: string;
            homePlace?: string;
            tagDtoList: { tagName: string }[];
        }[]
    >([]);
    const [fadeAnim, setFadeAnim] = useState<any>();

    function convertEng(place: string) {
        if (place === '원룸') {
            return 'ONE_ROOM';
        } else if (place === '거실') {
            return 'LIVING_ROOM';
        } else if (place === '침실') {
            return 'BEDROOM';
        } else if (place === '주방') {
            return 'KITCHEN';
        } else if (place === '발코니') {
            return 'VERANDA_BALCONY';
        } else if (place === '사무실') {
            return 'OFFICE';
        } else if (place === '가게') {
            return 'STORE';
        } else if (place === '야외') {
            return 'OUTDOOR';
        }
    }

    const [getContent, setGetContent] = useState<IUploadPicData[]>([
        { loc: '', hashtag: [], details: '', imgFile: null, realImg: null, realhashtag: [] },
    ]);

    const onAddWritingItem = () => {
        setGetContent([
            ...getContent,
            { loc: '', hashtag: [], details: '', imgFile: null, realImg: null, realhashtag: [] },
        ]);
    };

    const onRemoveWritingItem = useCallback(
        (i: number) => {
            setGetContent(getContent.filter((item, index) => index !== i));
        },
        [getContent],
    );

    interface Uploader {
        pictureSaveDtoList: {
            explain: string;
            homePlace?: string;
            tagDtoList: { tagName: string }[];
        }[];
    }

    const onSave = async () => {
        const formData = new FormData();

        for (let i = 0; i < getContent.length; i++) {
            saveDto.push({
                explain: getContent[i].details,
                homePlace: convertEng(getContent[i].loc),
                tagDtoList: getContent[i].realhashtag,
            });
        }

        const test: Uploader = {
            pictureSaveDtoList: saveDto,
        };

        const uploaderString = JSON.stringify(test);
        formData.append('saveList', new Blob([uploaderString], { type: 'application/json' }));

        for (let i = 0; i < getContent.length; i++) {
            if (!getContent[i].realImg) {
                console.log('데이터없음');
                return;
            }

            formData.append('file', getContent[i].realImg);
        }

        const res = await axios.post(`https://www.gardenersclub.co.kr/api/api/picture/save`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${TOKEN}`,
            },
        });
        navigate('/community/photo/');

        if (res.status === 201) console.log(res.data);
    };

    return (
        <StyledContainer>
            <StyledTabsContainer>
                <StyledHeaderBarContainer fadeAnim={fadeAnim}>
                    <StyledHeaderBar>
                        <StyledTitleBlock>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <StyledLogoImg src="/Gardener.png" />
                            </Link>
                        </StyledTitleBlock>
                        <StyledUploadButton>
                            <StyledUploadText onClick={onSave}>등록</StyledUploadText>
                        </StyledUploadButton>
                    </StyledHeaderBar>
                </StyledHeaderBarContainer>
                <StyledSubTabBarBlock>
                    <StyledSubTabBarContainer fadeAnim={fadeAnim}>
                        <StyledSubTabBarBlock1>
                            <StyledMenuItemBlock selected={true}>
                                <Link to={'/upload/photo'} style={{ textDecoration: 'none' }}>
                                    <StyledMenuItemText color={'#0d6637'}>사진</StyledMenuItemText>
                                </Link>
                            </StyledMenuItemBlock>
                            <StyledMenuItemBlock selected={false}>
                                <Link to={'/upload/video'} style={{ textDecoration: 'none' }}>
                                    <StyledMenuItemText color={'gray'}>동영상</StyledMenuItemText>
                                </Link>
                            </StyledMenuItemBlock>
                        </StyledSubTabBarBlock1>
                    </StyledSubTabBarContainer>
                </StyledSubTabBarBlock>
            </StyledTabsContainer>
            <StyledContentContainer>
                <StyledPictureContainer>
                    <StyledPictureHeader>
                        <CustomSelector optionData={option1} setGetOption={setGetOption1} />
                        <CustomSelector optionData={option2} setGetOption={setGetOption2} />
                    </StyledPictureHeader>
                    {getContent &&
                        getContent.map((item, i: number) => {
                            return (
                                <div key={i}>
                                    <WritingItem
                                        type="PHOTO"
                                        index={i}
                                        setGetContent={setGetContent}
                                        getContent={getContent}
                                        onRemove={i !== 0 ? onRemoveWritingItem : null}
                                    />
                                </div>
                            );
                        })}
                    <StyledAddBtn onClick={onAddWritingItem}>추가하기</StyledAddBtn>
                </StyledPictureContainer>
            </StyledContentContainer>
        </StyledContainer>
    );
};

const StyledMenuItemText = styled.h2<{ color: string }>`
    font-size: 13px;
    color: ${({ color }) => color};
    cursor: pointer;
    &:hover {
        color: #0d6637;
    }
    @media screen and (min-width: ${boundaryWidth}px) {
        font-size: 13px;
    }
`;

const StyledMenuItemBlock = styled.div<{ selected: boolean }>`
    margin-right: 30px;
    border-bottom: solid;
    border-width: ${({ selected }) => (selected ? '3px' : '0px')};
    border-color: #0d6637;
    padding-bottom: ${({ selected }) => (selected ? '0px' : '3px')};
`;

const StyledSubTabBarBlock1 = styled.div`
    width: 100%;
    display: flex;
    padding: 0px 20px 0px 20px;
    @media screen and (min-width: ${boundaryWidth}px) {
        padding-left: 20%;
        padding-right: 20%;
    }
`;

const StyledSubTabBarContainer = styled.div<{ fadeAnim: any }>`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-bottom: solid 1px;
    border-color: silver;
    animation: ${({ fadeAnim }) => fadeAnim} 0.1s;
    animation-fill-mode: forwards;
    @media screen and (min-width: ${boundaryWidth}px) {
        height: 40px;
    }
`;

const StyledPictureContainer = styled.div`
    height: 2000px;
`;

const StyledLogoImg = styled.img`
    width: 150px;
`;

const StyledPictureHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    padding-bottom: 15px;
`;

const StyledAddBtn = styled.button`
    width: 100%;
    border: none;
    font-size: 20px;
    color: gray;
    padding: 15px;
    :hover {
        background: lightgray;
        color: white;
    }
    @media screen and (max-width: ${boundaryWidth}px) {
        margin-top: 10px;
    }
`;

const StyledUploadText = styled.div`
    color: white;
    font-size: 15px;
`;

const StyledUploadButton = styled.div`
    width: 55px;
    height: 25px;
    padding: 9px;
    background-color: #0d6637;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-left: auto;
`;

const StyledTitleBlock = styled.div`
    @media screen and (max-width: ${boundaryWidth}px) {
        margin-right: auto;
    }
`;

const StyledContentContainer = styled.div``;

const StyledTabsContainer = styled.div``;

const StyledHeaderBarContainer = styled.div<{ fadeAnim: any }>`
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    z-index: 2;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: white;
    border-bottom: solid 1px;
    border-color: silver;
    @media screen and (max-width: ${minWidth}px) {
        justify-content: start;
    }
    @media screen and (max-width: ${boundaryWidth}px) {
        animation: ${({ fadeAnim }) => fadeAnim} 0.1s;
        animation-fill-mode: forwards;
    }
`;

const StyledHeaderBar = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 0px 20px 0px 20px;
    @media screen and (min-width: ${boundaryWidth}px) {
        height: 80px;
        padding-left: 20%;
        padding-right: 20%;
    }
`;

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 20%;
    padding-right: 20%;
`;

const StyledSubTabBarBlock = styled.div`
    position: fixed;
    width: 100%;
    top: 50px;
    left: 0px;
    z-index: 1;
    @media screen and (min-width: ${boundaryWidth}px) {
        top: 80px;
    }
`;

export default Picture;
