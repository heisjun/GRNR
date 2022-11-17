import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { ISelectedTag } from './SelectedTag.type';

const SelectedTag: React.FC<ISelectedTag> = (props) => {
    const { realdata, realsetClear } = props;

    const deleteList = (list: any) => {
        if (realdata.includes(list)) {
            realsetClear((prev: string | any[]) => {
                const arr = [...prev];
                arr.splice(prev.indexOf(list), 1);
                return arr;
            });
        } else {
            realsetClear((prev: any) => [...prev, list]);
        }
    };

    return (
        <StyledDiv>
            <StyledSelectedFilterContainer>
                {realdata.map((list, index) => {
                    return (
                        <StyledDiv key={index}>
                            <StyledSelected>
                                <span>#{list.tagName}</span> <FaTimes onClick={() => deleteList(list)} />
                            </StyledSelected>
                        </StyledDiv>
                    );
                })}
            </StyledSelectedFilterContainer>
        </StyledDiv>
    );
};

const StyledDiv = styled.div`
    display: inline;
`;

const StyledSelectedFilterContainer = styled.div`
    display: inline;
`;

const StyledSelected = styled.div`
    background-color: lightgray;
    box-sizing: border-box;
    font-size: 14px;
    color: #616161;
    margin-right: 5px;
    margin-top: 12px;
    padding: 6px 11px 6px 12px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    span {
        padding-right: 5px;
    }
`;

export default SelectedTag;
