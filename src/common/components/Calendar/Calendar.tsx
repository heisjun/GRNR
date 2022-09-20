import React, { useState } from 'react';
import { ICalendar } from './Calendar.type';
import styled from 'styled-components';
import Dates from './Dates';

const Calendar: React.FC<ICalendar> = (props) => {
    const { totalDate, month, year, today } = props;
    const lastDate = totalDate.indexOf(1);
    const firstDate = totalDate.indexOf(1, 7);

    const [todos, setTodos] = useState([0]);

    const findToday = totalDate.indexOf(today);
    const getMonth = new Date().getMonth() + 1;
    const getYear = new Date().getFullYear();

    return (
        <StyledCalendarContainer>
            {totalDate.map((item: number, index: number) => {
                return (
                    <Dates
                        key={index}
                        idx={index}
                        lastDate={lastDate}
                        firstDate={firstDate}
                        elm={item}
                        findToday={findToday === index && month === getMonth && findToday && year === getYear}
                        month={month}
                        year={year}
                    ></Dates>
                );
            })}
        </StyledCalendarContainer>
    );
};

const StyledCalendarContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
`;
export default Calendar;
