import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Question: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const onContentChange = () => {
        const divC = document.getElementById('contentInput');
        setContent(divC ? divC.innerHTML : '');
    };

    useEffect(() => {
        console.log(content);
    }, [content]);

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
            <StyledInputBlock id="contentInput" contentEditable="true" onInput={onContentChange}></StyledInputBlock>
        </StyledQuestionContainer>
    );
};

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
    width: 100%;
`;

export default Question;
