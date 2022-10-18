import axios from 'axios';
import TagBox from 'common/components/TagBox';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BASEURL = process.env.REACT_APP_BASE_URL;
const TOKEN = process.env.REACT_APP_USER_TOKEN;

const Question: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [getTag, setGetTag] = useState<string[]>([]);
    const [realgetTag, setRealgetTag] = useState<{ tagName: string }[]>([]);
    const imgInputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<any>(null);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null) return;

        if (e.target.files[0]) {
            const reader = new FileReader();
            const file = e.target.files[0];

            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            setFile(e.target.files[0]);
        }
    }, []);

    useEffect(() => {
        console.log('겟태그', getTag);
        console.log('rela겟태그', realgetTag);
    }, [getTag, realgetTag]);

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
            tagList: realgetTag,
        };

        console.log('업로드데이터:', uploader);

        const uploaderString = JSON.stringify(uploader);

        console.log('업로드스트링데이터:', uploaderString);
        formData.append('saveDto', new Blob([uploaderString], { type: 'application/json' }));

        const res = await axios.post(`${BASEURL}/api/inquiry/new`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${TOKEN}`,
            },
        });
        navigate(-1);

        if (res.status === 201) console.log(res.data);
    }, [file]);

    return (
        <StyledQuestionContainer>
            <StyledTitleInput
                type="text"
                placeholder="제목을 입력해주세요."
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
                style={title.length === 0 ? { borderColor: 'red' } : { borderColor: 'silver' }}
            />
            {title === '' ? <StyledTitleInfo>필수 입력 항목입니다.</StyledTitleInfo> : null}

            <input type="file" accept="image/*" ref={imgInputRef} style={{ display: 'none' }} onChange={handleChange} />
            <StyledImgUpload onClick={onImgUploadButton}>img</StyledImgUpload>
            <img src={imageUrl} style={{ width: 200, height: 200 }} />

            <StyledInputBlock2
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => {
                    setContent(e.target.value);
                }}
            />
            <TagBox realsetGetTag={setRealgetTag} realvalue={realgetTag} />
            <button onClick={handleClick}>등록</button>
        </StyledQuestionContainer>
    );
};

const StyledInputBlock2 = styled.textarea`
    width: 100%;
    margin-top: 20px;
    font-size: 15px;
    padding: 5px;
    background: #fff;
    border: 1px solid lightgrey;
    font-weight: 400;
    color: gray;
    border-radius: 5px;
    height: 150px;
    resize: none;
`;

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

export default Question;
