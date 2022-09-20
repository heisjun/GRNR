import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import TodosModal from '../TodosModal';
import { IDates } from './Dates.type';

const Dates: React.FC<IDates> = (props) => {
    const { lastDate, firstDate, elm, month, year, idx, findToday } = props;

    const [userInput, setUserInput] = useState({});
    const [evtList, setEvtList] = useState<any>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const dateKey = `${month}` + `${elm}`;
    const registEvent = (value: string) => {
        setEvtList([...evtList, value]);
        setUserInput('');
        setIsOpen(false);
    };

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <StyledDatesContainer
                onDoubleClick={() => {
                    toggle();
                }}
            >
                <StyledDateNum idx={idx} lastDate={lastDate} firstDate={firstDate}>
                    <StyledDayBlock>
                        <StyledDay findToday={findToday}>{elm}</StyledDay>
                    </StyledDayBlock>
                </StyledDateNum>
                <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                    <TodosModal
                        elm={elm}
                        month={month}
                        year={year}
                        registEvent={registEvent}
                        setOpenModal={setIsOpen}
                        openModal={isOpen}
                        userInput={userInput}
                        setUserInput={setUserInput}
                    />
                </Modal>

                {Boolean(evtList[0]) && (
                    <StyledLists>
                        {evtList.map((list: any, index: number) => {
                            return (
                                list.slice(0, list.indexOf('_')) === dateKey && (
                                    <StyledList key={index}>
                                        {list.slice(list.indexOf('_') + 1, list.length)}
                                    </StyledList>
                                )
                            );
                        })}
                    </StyledLists>
                )}
            </StyledDatesContainer>
        </>
    );
};
const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        left: '20%',
        top: '30%',
        margin: 'auto',
        width: '300px',
        height: '220px',
        padding: '0',
        overflow: 'hidden',
    },
};

const StyledDatesContainer = styled.div`
    position: relative;
    width: calc(100% / 7.2);
    height: 140px;
    text-align: right;
    border-left: 0.5px solid black;
    border-right: 0.5px solid black;
`;

const StyledDateNum = styled.div<{ idx: number; lastDate: number; firstDate: number }>`
    ${(props) => props.idx < props.lastDate && `color: #969696;`};

    ${(props) =>
        props.firstDate > 0 &&
        props.idx > props.firstDate - 1 &&
        `
    color: #969696;
  `};
`;

const StyledDayBlock = styled.div`
    font-weight: 400;
    background-color: white;
    display: flex;
    justify-content: center;
    border-bottom: 0.5px solid black;
    border-top: 0.5px solid black;
    padding: 2px;
`;

const StyledDay = styled.div<{ findToday: any }>`
    font-weight: 400;
    background-color: white;
    display: flex;
    justify-content: center;
    padding: 2px;
    ${(props) =>
        props.findToday &&
        ` position: relative;
            border-radius: 100%;
            
            font-weight: 400;
            color: #FFFFFF;
            background-color:red
            `}
`;

const StyledLists = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
`;
const StyledList = styled.span`
    margin-top: 0.3vw;
    padding-left: 0.5vw;
    background-color: #f7ced9;
    border-radius: 5px;
`;

export default Dates;
