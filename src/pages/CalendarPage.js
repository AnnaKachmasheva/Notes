import React from 'react';
import {useState} from "react";
import {
    days,
    months,
    getCountWeeksInMonth,
    getFirstDayInMonth,
    getLastDayInMonth
} from "../helper/Helper";
import RowComponent from "../components/RowComponent";
import {
    BsCalendarCheck,
    BsChevronLeft,
    BsChevronRight
} from "react-icons/bs";
import NavPart from "../parts/NavPart";
import SidePanelPart from "../parts/SidePanelPart";
import Footer from "../parts/FooterPart";

function CalendarPage() {

    const [numberMonth, setNumberMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());

    let firstDay = getFirstDayInMonth(year, numberMonth);
    let lastDay = getLastDayInMonth(year, numberMonth);

    function nextMonth() {
        if (numberMonth + 1 > 11) {
            setYear(year + 1);
            setNumberMonth(0);
        } else
            setNumberMonth(numberMonth + 1);
    }

    function previousMonth() {
        if (numberMonth - 1 < 0) {
            setYear(year - 1);
            setNumberMonth(11);
        } else
            setNumberMonth(numberMonth - 1);
    }

    function currentMonth() {
        setNumberMonth(new Date().getMonth());
        setYear(new Date().getFullYear());
    }

    function getFirstRow() {
        let firstRow = [];
        for (let i = 1; i <= 7; i++) {
            if (i < firstDay + 1)
                firstRow[i] = '';
            else {
                let number = i - firstDay;
                firstRow[i] = [number, numberMonth, year];
            }
        }
        return firstRow;
    }

    function getLastRow(num) {
        let lastRow = [];
        for (let i = 0; i < 7; i++) {
            if (i > lastDay)
                lastRow[i] = '';
            else {
                let number = num++;
                lastRow[i] = [number, numberMonth, year];
            }
        }
        return lastRow;
    }

    function getRows() {
        let rows = [];
        let rowNum = 0;
        rows[rowNum++] = getFirstRow();

        let num = 8 - firstDay;
        let countRow = getCountWeeksInMonth(year, numberMonth);
        for (let i = 0; i < countRow - 2; i++) {
            let row = [];
            for (let i = 0; i < 7; i++) {
                let number = num++;
                row[i] = [number, numberMonth, year];
            }
            rows[rowNum++] = row;
            row = null;
        }

        rows[rowNum++] = getLastRow(num);
        return rows;
    }

    return (
        <div className="main-container">

            <NavPart/>

            <div className="container">

                <SidePanelPart/>

                <div className="calendar">
                    <div className="calendar-header">
                        <button className="next-button"
                                onClick={() => previousMonth()}>
                            <BsChevronLeft className="icon"/>
                            <span>Předchozí</span>
                        </button>

                        <button className="prev-button"
                                onClick={() => nextMonth()}>
                            <span>Další</span>
                            <BsChevronRight className="icon"/>
                        </button>

                        <div className="month-and-year"
                             data-selected="full-date">
                            <p> {months[numberMonth]} / {year} </p>
                        </div>

                        <button className="current-day-button"
                                onClick={() => currentMonth()}>
                            <span>Dnes</span>
                            <BsCalendarCheck className="icon"/>
                        </button>
                    </div>

                    <table className="table"
                           id="calendar">
                        <thead>
                        <tr>
                            {days.map(
                                day => (<th>{day}</th>)
                            )}
                        </tr>
                        </thead>

                        <tbody>
                        {getRows().map(
                            row => <RowComponent row={row}/>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default CalendarPage;