import React from 'react';
import styled from 'styled-components';
import { ITodosModal } from './TodosModal.type';

const TodosModal: React.FC<ITodosModal> = (props) => {
    const { elm, month, year, registEvent, setOpenModal, userInput, setUserInput, openModal } = props;

    const userText = (e: any) => {
        const date = `${month}` + `${elm}`;
        setUserInput(`${date}_` + e.target.value);
    };

    return (
        <StyledModalContainer>
            <StyledHeader>일정등록</StyledHeader>
            <StyledViewDate>
                {year}.{month}.{elm}
            </StyledViewDate>
            <StyledEvents>
                <StyledContexts
                    placeholder="일정을 입력하세요"
                    onChange={(e) => {
                        userText(e);
                    }}
                ></StyledContexts>
            </StyledEvents>
            <StyledBtnBlock>
                <StyledRegistBtn
                    onClick={() => {
                        registEvent(userInput);
                    }}
                >
                    등록
                </StyledRegistBtn>
                <StyledCloseBtn
                    onClick={() => {
                        setOpenModal(false);
                    }}
                >
                    닫기
                </StyledCloseBtn>
            </StyledBtnBlock>
        </StyledModalContainer>
    );
};

const StyledModalContainer = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: white;
    text-align: left;
    color: black;
`;
const StyledHeader = styled.div`
    padding: 1vw 0 0.5vw 1vw;
    font-weight: 700;
    border-bottom: 2px solid #d3d3d3;
`;

const StyledViewDate = styled.div`
    padding: 0.4vw 0 0.3vw 1vw;
    border-bottom: 2px solid #d3d3d3;
`;
const StyledEvents = styled.div`
    height: 50%;
`;
const StyledContexts = styled.textarea`
    background-color: white;
    padding: 0.5vw;
    margin-bottom: 10px;
    width: 100%;
    height: 90%;
    border: none;
`;

const StyledBtnBlock = styled.div`
    display: flex;
    justify-content: space-between;
`;
const StyledRegistBtn = styled.div`
    margin: 0.4vw 0.9vw;
    padding: 0.3vw;
    width: 35px;
    font-size: 0.9rem;
    font-weight: 600;
    background-color: #d3d3d3;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
`;

const StyledCloseBtn = styled.div`
    margin: 0.4vw 0.9vw;
    padding: 0.3vw;
    width: 35px;
    font-size: 0.9rem;
    font-weight: 600;
    background-color: #d3d3d3;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
`;
export default TodosModal;
