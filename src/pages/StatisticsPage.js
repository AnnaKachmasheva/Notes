import React from 'react';
import ChartComponent from "../components/ChartComponent";
import {
    getCountAllNotes,
    getCountDayNotes,
    getCountMonthNotes,
    getCountWeekNotes,
    getCountYearNotes
} from "../helper/Helper";
import NavPart from "../parts/NavPart";

function StatisticsPage() {

    return (
        <div className="main-container-statistics">

            <NavPart/>

            <div className="container-statistics">
                <div className="item-current-day">
                    <p>Dnes</p>
                    {getCountDayNotes(new Date())}
                </div>

                <div className="item-current-week">
                    <p>Tento týden</p>
                    {getCountWeekNotes(new Date())}
                </div>

                <div className="item-current-month">
                    <p>Tento měsíc</p>
                    {getCountMonthNotes(new Date())}
                </div>

                <div className="item-current-year">
                    <p>Tento rok</p>
                    {getCountYearNotes(new Date())}
                </div>

                <div className="item-all-year">
                    <p>Celkový počet</p>
                    {getCountAllNotes()}
                </div>

                <ChartComponent className="item-current-year-diagram"/>

            </div>
        </div>
    )
}

export default StatisticsPage;