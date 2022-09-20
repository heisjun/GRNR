import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

const Question: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [crntRange, setCrntRange] = useState<Range>();
    const [imgFile, setImgFile] = useState<File>();
    const [imgUrls, setUrls] = useState<string[]>([]);

    const imgInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const divC = document.getElementById('contentInput');
        divC?.addEventListener('selectstart', selectionHandler);
        return () => {
            divC?.removeEventListener('selectstart', selectionHandler);
        };
    }, []);

    useEffect(() => {
        const divC = document.getElementById('contentInput');
        console.log(content);
        console.log(divC?.childNodes);
    }, [content]);

    const selectionHandler = useCallback(() => {
        setTimeout(() => setCrntRange(window.getSelection()?.getRangeAt(0)), 100);
    }, []);

    const onContentChange = useCallback(() => {
        const divC = document.getElementById('contentInput');
        setContent(divC ? divC.innerHTML : '');
        setCrntRange(window.getSelection()?.getRangeAt(0));
    }, []);

    const onImgUploadButton = useCallback(() => {
        if (!imgInputRef.current) {
            return;
        }
        imgInputRef.current.click();
    }, []);

    const onImgChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                const img = document.createElement('img');
                const div = document.createElement('div');
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => {
                    if (reader.result) {
                        img.src = reader.result.toString();
                        img.width = 700;
                    }
                };

                setImgFile(e.target.files[0]);

                div.appendChild(img);
                crntRange?.insertNode(div);

                e.target.value = '';
            }
        },
        [crntRange],
    );

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

            <input type="file" accept="image/*" ref={imgInputRef} style={{ display: 'none' }} onChange={onImgChange} />
            <StyledImgUpload onClick={onImgUploadButton}>img</StyledImgUpload>

            <StyledInputBlock id="contentInput" contentEditable="true" onInput={onContentChange} />
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

const StyledInputBlock = styled.div`
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
