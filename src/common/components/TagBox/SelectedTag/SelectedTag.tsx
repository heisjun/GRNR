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
                                #{list.tagName} <FaTimes onClick={() => deleteList(list)} />
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
    color: gray;
    margin-right: 5px;
    margin-top: 5px;
    padding: 5px;
    font-size: 14px;
    font-weight: 300;
    display: inline-block;
`;

export default SelectedTag;
