import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import {sequentialSort} from "./Sort.js";
// use objects for passing by reference
let myChart1 = {
}
let myChart2 = {
}
let myChart3 = {
}
let myChart4 = {
}
function makeChart(props, myChart) {

    console.log(myChart);
    console.log(props.id, myChart);
    let nums = props.nums.slice(); //copy by value
    let xAxis = props.label.slice();
    var ctx = document.getElementById(props.id).getContext('2d');
    let backgroundColorArray = new Array(props.nums.length);
    backgroundColorArray.fill('rgba(255, 99, 132, 0.2)');

    //For the subsequent renders, only need to update
    if ( typeof myChart.chart !== "undefined") {
        myChart.chart.data.datasets[0].data = nums;
        myChart.chart.data.labels = xAxis;
        myChart.chart.data.datasets[0].backgroundColor = backgroundColorArray.slice();
        myChart.chart.update();
        return myChart;
    }
    myChart.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xAxis,
            datasets: [{
                label: 'Sequential Sort',
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
            },
            plugins:{
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
               },
               title:{
                   display: true,
                   text : "Sequential Sort",
                   font:{
                       size : 20
                   }
               }
            },

        }
    });
    console.log(props.id, myChart);
    console.log(myChart);
}

function Graph(props){
    // props.reset in initialized to true to render the empty graph first
    useEffect(()=>{
        if(props.reset){
            switch (props.id){
                case "myChart1":
                    makeChart(props, myChart1);
                    break;
                case "myChart2":
                    makeChart(props, myChart2);
                    break;
                case "myChart3":
                    makeChart(props, myChart3);
                    break;
                case "myChart4":
                    makeChart(props, myChart4);
                    break;
                default:
                    console.log("Make chart error!");
            }

        }
    },[props.reset]);
    
    useEffect(()=>{
        if (props.sort){
            switch (props.id){
                case "myChart1":
                    sequentialSort(myChart1, props.sort);
                    break;
                case "myChart2":
                    sequentialSort(myChart2, props.sort);
                    break;
                case "myChart3":
                    sequentialSort(myChart3, props.sort);
                    break;
                case "myChart4":
                    sequentialSort(myChart4, props.sort);
                    break;
                default:
                    console.log("Make chart error!");
            }
            
        }
    },[props.sort]);
    return <canvas className="graph" id= {props.id} width="400" height="400"></canvas>
}
export default Graph;