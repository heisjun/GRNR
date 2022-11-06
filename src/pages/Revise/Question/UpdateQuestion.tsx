import axios from 'axios';
import { default as callApi } from 'common/api';
import TagBox from 'common/components/TagBox';
import { IQuestionDetailsParmas } from 'common/types';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const TOKEN = localStorage.getItem('accesstoken');

const UpdateQuestion: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [title, setTitle] = useState<string>('미리보기');
    const [content, setContent] = useState<string>('');
    const [getTag, setGetTag] = useState<string[]>([]);
    const imgInputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState<IQuestionDetailsParmas>();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await callApi.questionGet(Number(state));
                console.log(response.data.value[0]);
                setDetails(response.data.value[0]);
                setTitle(response.data.value[0].title);
                setContent(response.data.value[0].content);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchData();
    }, [state]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null) return;

        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    }, []);

    interface Uploader {
        title: string;
        content: string;
        tagList: {
            tagName: string;
        }[];
    }

    const onImgUploadButton = useCallback(() => {
        if (!imgInputRef.current) {
            return;
        }
        imgInputRef.current.click();
    }, []);

    const handleClick = useCallback(async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        const uploader: Uploader = {
            title: title,
            content: content,
            tagList: [{ tagName: '태그4' }, { tagName: '태그5' }, { tagName: '태그6' }],
        };
        const uploaderString = JSON.stringify(uploader);
        const InquiryId = JSON.stringify(state);
        formData.append('inquiryId', new Blob([InquiryId], { type: 'application/json' }));
        formData.append('saveDto', new Blob([uploaderString], { type: 'application/json' }));

        const res = await axios.put('http://43.201.2.18/api/api/inquiry/revise', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${TOKEN}`,
            },
        });
        navigate(-1);

        if (res.status === 201) console.log(res.data);
    }, [file]);

    useEffect(() => {
        console.log(getTag);
    }, [getTag]);

    return (
        <StyledQuestionContainer>
            <StyledTitleInput
                type="text"
                placeholder="제목을 입력해주세요."
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
                style={title.length === 0 ? { borderColor: 'red' } : { borderColor: '#676767' }}
            />
            {title === '' ? <StyledTitleInfo>필수 입력 항목입니다.</StyledTitleInfo> : null}

            <input type="file" accept="image/*" ref={imgInputRef} style={{ display: 'none' }} onChange={handleChange} />
            <StyledImgUpload onClick={onImgUploadButton}>img</StyledImgUpload>

            <StyledInputBlock
                type="text"
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <button onClick={handleClick}>등록</button>
        </StyledQuestionContainer>
    );
};

const StyledImgUpload = styled.div`
    width: 50px;
    height: 20px;
    background-color: silver;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    &:hover {
        background-color: grey;
    }
`;

const StyledTitleInfo = styled.div`
    font-size: 12px;
    font-weight: bold;
    color: red;
`;

const StyledInputBlock = styled.input`
    width: 100%;
    min-height: 500px;
    margin-top: 50px;
    &:focus {
        outline: none;
    }
`;

const StyledTitleInput = styled.input`
    width: 100%;
    height: 50px;
    border: none;
    border-bottom: solid 1px;
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 10px;
    &:focus {
        outline: none;
    }
`;

const StyledQuestionContainer = styled.div`
    width: 80%;
    margin: 0 auto;
`;

export default UpdateQuestion;
