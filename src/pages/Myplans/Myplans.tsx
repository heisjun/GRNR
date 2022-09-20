import styled from 'styled-components';
import { Profile } from 'domains';
import { useEffect, useState } from 'react';
import Calendar from 'common/components/Calendar';
import WeatherBox from 'common/components/WeatherBox';

const Myplans: React.FC = () => {
    const initial = new Date();
    const initialYear = initial.getFullYear();
    const initialMonth = initial.getMonth() + 1;
    const initialDay = initial.getDate();
    const WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];

    const [year, setYear] = useState(initialYear);
    const [month, setMonth] = useState(initialMonth);
    const [today, setToday] = useState(initialDay);
    const [totalDate, setTotalDate] = useState<any>([]);

    const makeCalendar = (month: any) => {
        //이전달의 마지막 날짜 & 요일
        const prevDate = new Date(year, month - 1, 0).getDate();
        const prevDay = new Date(year, month - 1, 0).getDay();

        //이번달 마지막 날짜 & 요일
        const nextDate = new Date(year, month, 0).getDate();
        const nextDay = new Date(year, month, 0).getDay();

        const PVLD = [];
        if (prevDay !== 6) {
            for (let i = 0; i < prevDay + 1; i++) {
                PVLD.unshift(prevDate - i);
            }
        }
        //다음 날짜 만들기
        const TLD = [];
        for (let i = 1; i < 7 - nextDay; i++) {
            if (i === 0) {
                return TLD;
            }
            TLD.push(i);
        }

        let TD = [];

        TD = [...Array(nextDate + 1).keys()].slice(1);

        return PVLD.concat(TD, TLD);
    };

    const NextMonth = () => {
        if (month < 12) {
            setMonth(month + 1);
        } else {
            setYear(year + 1);
            setMonth(1);
        }
    };

    const PrevMonth = () => {
        if (month > 1) {
            setMonth(month - 1);
        } else {
            setYear(year - 1);
            setMonth(12);
        }
    };

    function convertEng(month: number) {
        if (month === 1) {
            return 'JANUARY';
        } else if (month === 2) {
            return 'FEBRUARY';
        } else if (month === 3) {
            return 'MARCH';
        } else if (month === 4) {
            return 'APRIL';
        } else if (month === 5) {
            return 'MAY';
        } else if (month === 6) {
            return 'JUN';
        } else if (month === 7) {
            return 'JULY';
        } else if (month === 8) {
            return 'AUGUEST';
        } else if (month === 9) {
            return 'SEPTEMBER';
        } else if (month === 10) {
            return 'OCTOBER';
        } else if (month === 11) {
            return 'NOVEMBER';
        } else if (month === 12) {
            return 'DECEMBER';
        }
    }

    useEffect(() => {
        setTotalDate(makeCalendar(month));
    }, [month]);

    return (
        <StyledMyplansContainer>
            <StyledProfileContainer>
                <StyledProfileBlock>
                    <Profile />
                </StyledProfileBlock>
            </StyledProfileContainer>
            <StyledContextContainer>
                <WeatherBox />
                <StyledBorderLine />
                <StyledCalendarBlock>
                    <CalendarHeader>
                        <StyledContentBlock>
                            <StyledMonthText>{convertEng(month)}</StyledMonthText>
                            <StyledYearText>{year}</StyledYearText>
                        </StyledContentBlock>
                        <StyledContentBlock>
                            <StyledPrevBtn onClick={() => PrevMonth()}>{'<'} </StyledPrevBtn>
                            <StyledNextBtn onClick={() => NextMonth()}>{'>'}</StyledNextBtn>
                        </StyledContentBlock>
                    </CalendarHeader>
                    <CalendarBody>
                        <Weeks>
                            {WEEK.map((elm, idx) => {
                                return <Day key={idx}>{elm}</Day>;
                            })}
                        </Weeks>
                        <Calendar totalDate={totalDate} month={month} year={year} today={today} />
                    </CalendarBody>
                </StyledCalendarBlock>
            </StyledContextContainer>
        </StyledMyplansContainer>
    );
};

const StyledContentBlock = styled.div`
    display: flex;
`;

const StyledBorderLine = styled.div`
    width: 100%;
    border-bottom: solid 1px;
    border-color: #eaeaea;
    margin: 20px 0px 20px 0px;
`;

const StyledPrevBtn = styled.div`
    font-size: 30px;
    font-weight: 300;
    margin-right: 50px;
    color: gray;
    cursor: pointer;
`;

const StyledNextBtn = styled.div`
    font-size: 30px;
    font-weight: 300;
    color: gray;
    cursor: pointer;
`;

const StyledMonthText = styled.div`
    font-size: 30px;
    font-weight: 800;
    color: gray;
    margin-right: 20px;
`;

const StyledYearText = styled.div`
    font-size: 30px;
    font-weight: 400;
    color: gray;
`;

const CalendarHeader = styled.div`
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
`;

const CalendarBody = styled.div`
    width: 100%;
`;

const StyledCalendarBlock = styled.div`
    width: 100%;
`;

const StyledProfileBlock = styled.div`
    position: relative;
    width: 85%;
    padding-bottom: 150%;
`;

const StyledProfileContainer = styled.div`
    width: 25%;
`;

const StyledContextContainer = styled.div`
    width: 73%;
    height: 5000px;
    margin-left: 2%;
`;

const StyledMyplansContainer = styled.div`
    margin-top: 40px;
    width: 100%;
    display: flex;
`;

const Weeks = styled.div`
    display: flex;
    justify-content: center;
`;
const Day = styled.div`
    width: calc(100% / 7.2);
    text-align: right;
    :nth-child(7n + 1) {
        color: red;
    }
    :nth-child(7n) {
        color: blue;
    }
    display: flex;
    justify-content: center;
    padding-top: 0.5vw;
    padding-bottom: 0.5vw;
    border-left: 0.5px solid black;
    border-right: 0.5px solid black;
    border-top: 0.5px solid black;
`;

export default Myplans;
