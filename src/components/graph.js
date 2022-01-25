import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import {sequentialSort} from "./Sort.js";

let myChart;

function makeChart(props) {
    let nums = props.nums.slice(); //copy by value
    let xAxis = props.label.slice();
    var ctx = document.getElementById('myChart').getContext('2d');
    let backgroundColorArray = new Array(props.nums.length);
    backgroundColorArray.fill('rgba(255, 99, 132, 0.2)');
    //For the subsequent renders, only need to update
    if ( typeof myChart !== "undefined") {
        myChart.data.datasets[0].data = nums;
        myChart.data.labels = xAxis;
        myChart.data.datasets[0].backgroundColor = backgroundColorArray.slice();
        console.log("updated only");
        myChart.update();
        return myChart;
    }
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xAxis,
            datasets: [{
                label: '# of Votes',
                data: nums,
                backgroundColor: backgroundColorArray,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: false,
            animation: {
                duration: 0
            }
        }
    });
}

function Graph(props){
    // props.reset in initialized to true to render the empty graph first
    useEffect(()=>{
        if(props.reset){
            makeChart(props);
        }
    },[props.reset]);
    
    useEffect(()=>{
        if (props.sort){
            sequentialSort(myChart, props.sort);
        }
    },[props.sort]);
    return <canvas id="myChart" width="400" height="400"></canvas>
}
export default Graph;