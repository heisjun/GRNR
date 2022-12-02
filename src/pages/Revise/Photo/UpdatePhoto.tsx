import CustomSelector from 'common/components/CustomSelector';
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { pictureDtoParams } from 'common/types';
import axios from 'axios';
import UpdateWritingItem from 'common/components/UpdateWritingItem';
import { default as callApi } from 'common/api';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;
const maxWidth = process.env.REACT_APP_MAX_WIDTH;
const minWidth = process.env.REACT_APP_MIN_WIDTH;

const BASEURL = 'https://www.gardenersclub.co.kr/api';
const TOKEN = sessionStorage.getItem('accesstoken');

const option1 = [
    {
        id: 1,
        name: '분류',
        list: ['잎보기식물', '꽃보기식물', '열매보기식물', '선인장&다육식물'],
    },
];

const Picture: React.FC = () => {
    const navigate = useNavigate();
    const [textValue, setTextValue] = useState('');
    const [fadeAnim, setFadeAnim] = useState<any>();
    const { state } = useLocation();
    const [details, setDetails] = useState<pictureDtoParams[]>([]);

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
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const [getOption1, setGetOption1] = useState('');

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

    function convertEng2(classification: string) {
        if (classification === '잎보기식물') {
            return 'LEAF';
        } else if (classification === '꽃보기식물') {
            return 'FLOWER';
        } else if (classification === '열매보기식물') {
            return 'FRUIT';
        } else if (classification === '선인장,다육식물') {
            return 'SUCCULENT';
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
                classification: '',
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
        return file;
    };

    interface Uploader {
        classification: any;
        pictureSaveDtoList: {
            explain: string;
            homePlace?: string;
            tagDtoList: { tagName: string }[];
        }[];
    }

    const onSave = async () => {
        console.log(getOption1);
        if (getOption1 === '분류') {
            alert('분류를 입력해주세요!');
            return;
        }
        const formData = new FormData();

        for (let i = 0; i < details.length; i++) {
            saveDto.push({
                explain: details[i].explain,
                homePlace: convertEng(details[i].homePlace),
                tagDtoList: details[i].tagList,
            });
        }

        const test: Uploader = {
            classification: convertEng2(getOption1),
            pictureSaveDtoList: saveDto,
        };

        const uploaderString = JSON.stringify(test);

        const picId = JSON.stringify(state);

        formData.append('pictureId', new Blob([picId], { type: 'application/json' }));
        formData.append('saveList', new Blob([uploaderString], { type: 'application/json' }));

        for (let i = 0; i < details.length; i++) {
            if (!details[i].pictureUrl) {
                console.log('데이터없음');
                return;
            }

            formData.append('file', await convertURLtoFile(details[i].pictureUrl));
        }

        const res = await axios.put(`${BASEURL}/api/picture/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${TOKEN}`,
            },
        });

        if (res.status === 201) console.log(res.data);
        navigate(-1);
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
                            <StyledUploadText onClick={onSave}>수정</StyledUploadText>
                        </StyledUploadButton>
                    </StyledHeaderBar>
                </StyledHeaderBarContainer>
            </StyledTabsContainer>
            <StyledContentContainer>
                <StyledPictureContainer>
                    <StyledPictureHeader>
                        <CustomSelector optionData={option1} setGetOption={setGetOption1} value={getOption1} />
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
                </StyledPictureContainer>
            </StyledContentContainer>
        </StyledContainer>
    );
};

const StyledPictureContainer = styled.div`
    padding-bottom: 120px;
`;

const StyledLogoImg = styled.img`
    width: 198px;
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
    :hover {
        background-color: gray;
        color: #0d6637;
    }
`;

const StyledTitleBlock = styled.div`
    @media screen and (max-width: ${boundaryWidth}px) {
        margin-right: auto;
    }
`;

const StyledContentContainer = styled.div`
    width: 720px;
    padding-top: 40px;
`;

const StyledTabsContainer = styled.div``;

const StyledHeaderBarContainer = styled.div<{ fadeAnim: any }>`
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    z-index: 20;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-bottom: solid 1px;
    border-color: silver;
    background-color: white;
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
    @media screen and (max-width: ${maxWidth}px) {
        height: 80px;
        padding-left: 20%;
        padding-right: 20%;
    }
    @media screen and (min-width: ${maxWidth}px) {
        height: 80px;
        margin-left: 390px;
        margin-right: 390px;
    }
`;

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default Picture;
