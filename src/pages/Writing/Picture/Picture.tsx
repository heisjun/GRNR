import CustomSelector from 'common/components/CustomSelector';
import WritingItem from 'common/components/WritingItem';
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { IUploadPicData } from 'common/types';
import axios from 'axios';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const BASEURL = process.env.REACT_APP_BASE_URL;
const TOKEN = process.env.REACT_APP_USER_TOKEN;

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
        console.log('saveList:', uploaderString);
        formData.append('saveList', new Blob([uploaderString], { type: 'application/json' }));

        for (let i = 0; i < getContent.length; i++) {
            if (!getContent[i].realImg) {
                console.log('데이터없음');
                return;
            }

            formData.append('file', getContent[i].realImg);
            console.log(getContent[i].realImg);
        }

        const res = await axios.post(`${BASEURL}/api/picture/save`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${TOKEN}`,
            },
        });

        if (res.status === 201) console.log(res.data);
    };

    return (
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
            <button onClick={onSave}>제출</button>
        </StyledPictureContainer>
    );
};

const StyledPictureContainer = styled.div`
    height: 2000px;
`;

const StyledPictureHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-top: -20px;
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

export default Picture;
