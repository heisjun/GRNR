import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IPlanFlow } from './PlanFlow.type';

const PlanFlow: React.FC<IPlanFlow> = (props) => {
    const { data, currentDate } = props;

    const monthEng = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    return (
        <StyledPlanFlowContainer>
            <StyledHeaderBlock>
                <StyledCrntMonth>{monthEng[currentDate.getMonth()]}</StyledCrntMonth>
                <StyledNextMonth>
                    {monthEng[currentDate.getMonth() + 1 < 12 ? currentDate.getMonth() + 1 : 0]}
                </StyledNextMonth>
                <StyledPrevButton />
                <StyledNextButton />
            </StyledHeaderBlock>
            <StyledContentContainer>
                <StyledPlantBlock></StyledPlantBlock>
                <StyledPlansContainer>
                    <StyledPlansBlock>
                        {Array.from({ length: monthDays[currentDate.getMonth()] }, (_, i) => i + 1).map(
                            (item, index) => (
                                <StyledDayBlock key={index}>
                                    <StyledDayText>{item}</StyledDayText>
                                </StyledDayBlock>
                            ),
                        )}
                    </StyledPlansBlock>
                </StyledPlansContainer>
            </StyledContentContainer>
        </StyledPlanFlowContainer>
    );
};

const StyledDayText = styled.div`
    font-size: 12px;
    color: grey;
    font-weight: bold;
`;

const StyledDayBlock = styled.div`
    width: 31.11px;
    height: 31.11px;
    border-bottom: solid 2px;
    border-color: silver;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledPlantBlock = styled.div`
    width: 90px;
    height: 500px;
    display: flex;
    border-top: solid 2px;
    border-color: silver;
`;

const StyledPlansBlock = styled.div`
    width: 200%;
    height: 500px;
    overflow: hidden;
    display: flex;
`;

const StyledPlansContainer = styled.div`
    width: 560px;
    height: 500px;
    border-left: solid 2px;
    border-top: solid 2px;
    border-color: silver;
    display: flex;
`;

const StyledNextMonth = styled.div`
    margin-left: 250px;
    font-weight: bold;
    font-size: 12px;
    color: grey;
`;

const StyledCrntMonth = styled.div`
    margin-left: 20px;
    font-weight: bold;
    font-size: 12px;
    color: grey;
`;

const StyledNextButton = styled.div`
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin-left: 30px;
    border-radius: 20px;
    background-color: grey;
    &:hover {
        background-color: silver;
    }
`;

const StyledPrevButton = styled.div`
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin-left: 110px;
    border-radius: 20px;
    background-color: grey;
    &:hover {
        background-color: silver;
    }
`;

const StyledHeaderBlock = styled.div`
    margin-left: 90px;
    width: 100%;
    height: 30px;
    border-left: solid 2px;
    border-color: silver;
    display: flex;
    align-items: center;
`;

const StyledContentContainer = styled.div`
    display: flex;
`;

const StyledPlanFlowContainer = styled.div`
    width: 100%;
    height: 100%;
`;

export default PlanFlow;
