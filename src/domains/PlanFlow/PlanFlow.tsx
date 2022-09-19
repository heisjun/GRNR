import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { IPlanFlow } from './PlanFlow.type';

const PlanFlow: React.FC<IPlanFlow> = (props) => {
    const { data, currentDate } = props;
    const [crntMonth, setCrntMonth] = useState<number>(currentDate.getMonth());
    const [crntYear, setCrntYear] = useState<number>(currentDate.getFullYear());
    const [crntPage, setCrntPage] = useState<number>(0);
    const pageRef = useRef<any>(null);

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

    const onNextButton = () => {
        if (crntPage === 1) {
            setCrntPage(0);
            if (crntMonth === 11) {
                setCrntMonth(0);
                setCrntYear((crntYear) => crntYear + 1);
            } else {
                setCrntMonth((crntMonth) => crntMonth + 1);
            }
        } else {
            setCrntPage(1);
        }
    };

    const onPrevButton = () => {
        if (crntPage === 0) {
            setCrntPage(1);
            if (crntMonth === 0) {
                setCrntMonth(11);
                setCrntYear((crntYear) => crntYear - 1);
            } else {
                setCrntMonth((crntMonth) => crntMonth - 1);
            }
        } else {
            setCrntPage(0);
        }
    };

    useEffect(() => {
        pageRef.current.style.transition = 'all 0.5s ease-in-out';
        pageRef.current.style.transform = `translateX(-${(100 / 2) * crntPage}%)`;
    }, [crntPage]);

    return (
        <StyledPlanFlowContainer>
            <StyledHeaderBlock>
                <StyledCrntMonth>{monthEng[crntMonth]}</StyledCrntMonth>
                <StyledNextMonth>{monthEng[crntMonth + 1 < 12 ? crntMonth + 1 : 0]}</StyledNextMonth>
                <StyledPrevImage src={`${process.env.REACT_APP_BASE_SRC}/prev.png`} onClick={onPrevButton} />
                <StyledNextImage src={`${process.env.REACT_APP_BASE_SRC}/next.png`} onClick={onNextButton} />
            </StyledHeaderBlock>
            <StyledContentContainer>
                <StyledPlantsBlock>
                    <StyledPlantTitleBlock>Plants</StyledPlantTitleBlock>
                    {data.map((item, index) => (
                        <StyledPlantBlock key={index}>{item.plantName}</StyledPlantBlock>
                    ))}
                </StyledPlantsBlock>
                <StyledPlansContainer>
                    <StyledPlansBlock ref={pageRef}>
                        <StyledDaysBlock>
                            {Array.from(
                                { length: new Date(crntYear, crntMonth + 1, -1).getDate() },
                                (_, i) => i + 1,
                            ).map((item, index) => (
                                <StyledDayBlock key={index}>
                                    <StyledDayText>{item}</StyledDayText>
                                </StyledDayBlock>
                            ))}
                        </StyledDaysBlock>
                        {data.map((item, index) => (
                            <StyledPlanItemsBlock key={index}>
                                {Array.from(
                                    { length: new Date(crntYear, crntMonth + 1, -1).getDate() },
                                    (_, i) => i + 1,
                                ).map((day, index) => (
                                    <StyledPlanItemContainer
                                        key={index}
                                        style={index % 7 === 0 || index % 7 === 1 ? { backgroundColor: '#EAEAEA' } : {}}
                                    >
                                        {item.plans.filter(
                                            (plan: { date: string; text: string }) =>
                                                Number(plan.date.split('-')[0]) === crntYear &&
                                                Number(plan.date.split('-')[1]) === crntMonth + 1 &&
                                                Number(plan.date.split('-')[2]) === day,
                                        ).length === 1 ? (
                                            <StyledPlanItemBlock>
                                                <StyledPlanItemText>
                                                    {
                                                        item.plans.filter(
                                                            (plan: { date: string; text: string }) =>
                                                                Number(plan.date.split('-')[0]) === crntYear &&
                                                                Number(plan.date.split('-')[1]) === crntMonth + 1 &&
                                                                Number(plan.date.split('-')[2]) === day,
                                                        )[0].text
                                                    }
                                                </StyledPlanItemText>
                                            </StyledPlanItemBlock>
                                        ) : (
                                            ''
                                        )}
                                    </StyledPlanItemContainer>
                                ))}
                            </StyledPlanItemsBlock>
                        ))}
                    </StyledPlansBlock>
                </StyledPlansContainer>
            </StyledContentContainer>
        </StyledPlanFlowContainer>
    );
};

const StyledPlanItemText = styled.div`
    white-space: nowrap;
    font-size: 11px;
    color: grey;
    font-weight: bold;
    z-index: 1;
`;

const StyledPlanItemBlock = styled.div`
    width: 38px;
    height: 49px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    border: solid 1px;
    border-color: silver;
    background-color: white;
`;

const StyledPlanItemContainer = styled.div`
    width: 40px;
    height: 51px;
    display: flex;
`;

const StyledPlanItemsBlock = styled.div`
    width: 200%;
    height: 51px;
    display: flex;
`;

const StyledPlantBlock = styled.div`
    width: 100%;
    height: 50px;
    border-bottom: solid 1px;
    border-color: silver;
    display: flex;
    align-items: center;
    font-size: 11px;
    color: grey;
    font-weight: bold;
`;

const StyledDayText = styled.div`
    font-size: 12px;
    color: grey;
    font-weight: bold;
`;

const StyledDayBlock = styled.div`
    width: 40px;
    height: 31.11px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledPlantTitleBlock = styled.div`
    width: 100%;
    height: 31.11px;
    border-bottom: solid 1px;
    border-color: silver;
    display: flex;
    align-items: center;
    font-size: 12px;
    color: grey;
    font-weight: bold;
`;

const StyledPlantsBlock = styled.div`
    width: 103px;
    height: 500px;
    display: flex;
    flex-direction: column;
    border-top: solid 1px;
    border-color: silver;
`;

const StyledDaysBlock = styled.div`
    width: 200%;
    height: 31.11px;
    display: flex;
    border-bottom: solid 1px;
    border-color: silver;
`;

const StyledPlansBlock = styled.div`
    width: 200%;
    height: 500px;
    display: flex;
    flex-direction: column;
`;

const StyledPlansContainer = styled.div`
    width: 660px;
    height: 500px;
    overflow: hidden;
    border-left: solid 1px;
    border-top: solid 1px;
    border-color: silver;
    display: flex;
`;

const StyledNextMonth = styled.div`
    position: absolute;
    width: 50px;
    left: 30%;
    font-weight: bold;
    font-size: 12px;
    color: grey;
`;

const StyledCrntMonth = styled.div`
    position: absolute;
    width: 50px;
    left: 2%;
    font-weight: bold;
    font-size: 12px;
    color: grey;
`;

const StyledNextImage = styled.img`
    position: absolute;
    left: 80%;
    cursor: pointer;
    width: 10px;
    height: 15px;
    &:hover {
        background-color: silver;
    }
`;

const StyledPrevImage = styled.img`
    position: absolute;
    left: 70%;
    cursor: pointer;
    width: 10px;
    height: 15px;
    &:hover {
        background-color: silver;
    }
`;

const StyledHeaderBlock = styled.div`
    position: relative;
    margin-left: 98px;
    width: 100%;
    height: 30px;
    border-left: solid 1px;
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
