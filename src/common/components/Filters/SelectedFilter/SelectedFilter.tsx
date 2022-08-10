import React from 'react';
import styled from 'styled-components';
import { ISelectedFilter } from './SelectedFilter.type';
import { FaTimes } from 'react-icons/fa';

const boundaryWidth = process.env.REACT_APP_BOUNDARY_WIDTH;

const SelectedFilter: React.FC<ISelectedFilter> = (props) => {
    const { data, setClear } = props;
    const deleteList = (list: any) => {
        if (data.includes(list)) {
            setClear((prev: string | any[]) => {
                const arr = [...prev];
                arr.splice(prev.indexOf(list), 1);
                return arr;
            });
        } else {
            setClear((prev: any) => [...prev, list]);
        }
    };

    return (
        <StyledDiv>
            <StyledSelectedFilterContainer>
                {data.map((list: any) => {
                    return (
                        <StyledDiv key={list}>
                            <StyledSelected>
                                {list} <FaTimes onClick={() => deleteList(list)} />
                            </StyledSelected>
                        </StyledDiv>
                    );
                })}
                {data.length !== 0 ? <StyledClearButton onClick={() => setClear([])}>초기화</StyledClearButton> : null}
            </StyledSelectedFilterContainer>
        </StyledDiv>
    );
};

const StyledDiv = styled.div``;

const StyledSelectedFilterContainer = styled.div`
    display: flex;
    margin-right: 5px;
`;

const StyledSelected = styled.div`
    background: gray;
    color: white;
    margin-right: 5px;
    margin-top: 5px;
    padding: 5px;
    font-size: 14px;
    border-radius: 4px;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 1.5vw;
    }
`;

const StyledClearButton = styled.button`
    background: gray;
    color: white;
    margin-right: 5px;
    margin-top: 5px;
    padding: 5px;
    font-size: 14px;
    border-radius: 4px;
    border: none;
    @media screen and (max-width: ${boundaryWidth}px) {
        font-size: 1.5vw;
    }
`;

export default SelectedFilter;
