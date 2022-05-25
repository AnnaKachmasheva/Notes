import React from 'react';
import {Component} from "react";
import * as echarts from "echarts";
import {getCountMonthNotes, months} from "../helper/Helper";

class ChartComponent extends Component {

    componentDidMount() {
        let myChart = echarts.init(document.getElementById('diagram'));

        function getCountNotesInMonthsCurrentYear() {
            let count = [];
            let currYear = new Date().getFullYear();
            for (let i = 0; i < 12; i++)
                count.push(getCountMonthNotes(new Date(currYear, i)));
            return count;
        }

        myChart.setOption({
            title: {
                text: "Poznámky tento rok"
            },
            tooltip: {},
            grid: {
                top: "10%"
            },
            xAxis: {
                type: "category",
                data: months
            },
            yAxis: {
                type: "value"
            },
            series: [{
                data: getCountNotesInMonthsCurrentYear(),
                type: "bar",
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: "#c777b9"
                            },
                            {
                                offset: 0.25,
                                color: "#ba83ca"
                            },
                            {
                                offset: 0.5,
                                color: "#aa8fd8"
                            },
                            {
                                offset: 0.75,
                                color: "#9a9ae1"
                            },
                            {
                                offset: 1,
                                color: "#8aa7ec"
                            }
                        ])
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                            [{
                                offset: 0,
                                color: "#6eacf1"
                                },
                                {
                                    offset: 0.5,
                                    color: "#79b3f4"
                                },
                                {
                                    offset: 0.1,
                                    color: "#52cffe"
                                }
                            ])
                    }
                }
            }]
        });
    }

    render() {
        return (
            <div id="diagram"
                 style={{
                     height: "100%",
                     width: "100%",
                 }}/>
        );
    }
}

export default ChartComponent;