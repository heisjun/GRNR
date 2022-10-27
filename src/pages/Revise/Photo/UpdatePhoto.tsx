import CustomSelector from 'common/components/CustomSelector';
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { pictureDtoParams } from 'common/types';
import axios from 'axios';
import UpdateWritingItem from 'common/components/UpdateWritingItem';
import { default as callApi } from 'common/api';
import { useLocation } from 'react-router-dom';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
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
    const [textValue, setTextValue] = useState('');
    const handleSetValue = (e: any) => {
        setTextValue(e.target.value);
    };
    const { state } = useLocation();
    const [details, setDetails] = useState<pictureDtoParams[]>([]);
    const [getOption1, setGetOption1] = useState('');
    const [getOption2, setGetOption2] = useState('');
    const [loading, setLoading] = useState(false);
    const [saveDto, setSaveDto] = useState<
        {
            explain: string;
            homePlace?: string;
            tagDtoList: { tagName: string }[];
        }[]
    >([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await callApi.getDetailList(Number(state), 'picture');
                setDetails(response.data.value.pictureContentDtoList);
                console.log('불러온데이터:', response.data.value.pictureContentDtoList);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    function convertEng(place: string) {
        if (place === '원룸' || place === 'ONE_ROOM') {
            return 'ONE_ROOM';
        } else if (place === '거실' || place === 'LIVING_ROOM') {
            return 'LIVING_ROOM';
        } else if (place === '침실' || place === 'BEDROOM') {
            return 'BEDROOM';
        } else if (place === '주방' || place === 'KITCHEN') {
            return 'KITCHEN';
        } else if (place === '발코니' || place === 'VERANDA_BALCONY') {
            return 'VERANDA_BALCONY';
        } else if (place === '사무실' || place === 'OFFICE') {
            return 'OFFICE';
        } else if (place === '가게' || place === 'STORE') {
            return 'STORE';
        } else if (place === '야외' || place === 'OUTDOOR') {
            return 'OUTDOOR';
        }
    }

    const onAddWritingItem = () => {
        setDetails([
            ...details,
            {
                pictureId: details[0].pictureId,
                contentId: details[0].contentId,
                pictureUrl: '',
                explain: '',
                homePlace: '',
                tagList: [],
            },
        ]);
    };

    const onRemoveWritingItem = useCallback(
        (i: number) => {
            setDetails(details.filter((item, index) => index !== i));
        },
        [details],
    );

    const convertURLtoFile = async (url: string) => {
        const response = await fetch(url);
        const data = await response.blob();
        const ext = url.split('.').pop(); // url 구조에 맞게 수정할 것
        const filename = url.split('/').pop(); // url 구조에 맞게 수정할 것
        const metadata = { type: `image/${ext}` };
        const file = new File([data], filename!, metadata);
        console.log('되나?:', file);
        return file;
    };

    interface Uploader {
        pictureSaveDtoList: {
            explain: string;
            homePlace?: string;
            tagDtoList: { tagName: string }[];
        }[];
    }

    const onSave = async () => {
        console.log('디테일스:', details);
        const formData = new FormData();

        for (let i = 0; i < details.length; i++) {
            saveDto.push({
                explain: details[i].explain,
                homePlace: convertEng(details[i].homePlace),
                tagDtoList: details[i].tagList,
            });
        }

        const test: Uploader = {
            pictureSaveDtoList: saveDto,
        };

        const uploaderString = JSON.stringify(test);

        const picId = JSON.stringify(state);

        formData.append('pictureId', new Blob([picId], { type: 'application/json' }));
        console.log('saveList:', uploaderString);
        formData.append('saveList', new Blob([uploaderString], { type: 'application/json' }));

        for (let i = 0; i < details.length; i++) {
            if (!details[i].pictureUrl) {
                console.log('데이터없음');
                return;
            }
            console.log(details[i].pictureUrl);
            formData.append('file', await convertURLtoFile(details[i].pictureUrl));
        }

        const res = await axios.put(`${BASEURL}/api/picture/update`, formData, {
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
                <div>{Number(state)}</div>
            </StyledPictureHeader>
            {details.map((item, index) => {
                return (
                    <div key={index}>
                        <UpdateWritingItem
                            type="PHOTO"
                            index={index}
                            setGetContent={setDetails}
                            getContent={details}
                            onRemove={index !== 0 ? onRemoveWritingItem : null}
                            beforeData={item}
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
