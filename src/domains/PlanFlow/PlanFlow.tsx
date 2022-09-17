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
            setCrntMonth((crntMonth) => (crntMonth === 11 ? 0 : crntMonth + 1));
        } else {
            setCrntPage(1);
        }
    };

    const onPrevButton = () => {
        if (crntPage === 0) {
            setCrntPage(1);
            setCrntMonth((crntMonth) => (crntMonth === 0 ? 11 : crntMonth - 1));
        } else {
            setCrntPage(0);
        }
    };

    useEffect(() => {
        pageRef.current.style.transition = 'all 0.7s ease-in-out';
        pageRef.current.style.transform = `translateX(-${(100 / 2) * crntPage}%)`;
    }, [crntPage]);

    return (
        <StyledPlanFlowContainer>
            <StyledHeaderBlock>
                <StyledCrntMonth>{monthEng[crntMonth]}</StyledCrntMonth>
                <StyledNextMonth>{monthEng[crntMonth + 1 < 12 ? crntMonth + 1 : 0]}</StyledNextMonth>
                <StyledPrevButton onClick={onPrevButton} />
                <StyledNextButton onClick={onNextButton} />
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
                    </StyledPlansBlock>
                </StyledPlansContainer>
            </StyledContentContainer>
        </StyledPlanFlowContainer>
    );
};

const StyledPlanBlock = styled.div`
    width: 31.11px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledPlantBlock = styled.div`
    width: 100%;
    height: 45px;
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
    border-bottom: solid 1px;
    border-color: silver;
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
    height: 500px;
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

const StyledNextButton = styled.div`
    position: absolute;
    left: 75%;
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: grey;
    &:hover {
        background-color: silver;
    }
`;

const StyledPrevButton = styled.div`
    position: absolute;
    left: 65%;
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: grey;
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
