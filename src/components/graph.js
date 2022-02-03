import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import {Sort} from "./Sort.js";
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

    //console.log(props.max);
    // console.log(props.id, myChart);
    let nums = props.nums.slice(); //copy by value
    let xAxis = props.label.slice();
    var ctx = document.getElementById(props.id).getContext('2d');
    let backgroundColorArray = new Array(props.nums.length);
    backgroundColorArray.fill('rgba(255, 99, 132, 0.2)');

    //For the subsequent renders, only need to update
    if ( typeof myChart.chart !== "undefined") {
        myChart.chart.data.datasets[0].data = nums;
        myChart.chart.data.labels = nums.map(v => '');
        myChart.chart.data.datasets[0].backgroundColor = backgroundColorArray.slice();
        myChart.chart.options.scales.y.max = props.max;
        myChart.chart.update();
        return myChart;
    }
    myChart.chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nums.map(v => ''),
            datasets: [{
                label: props.sortType,
                data: nums,
                backgroundColor: backgroundColorArray,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    max: props.max,
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
                   text : props.sortType,
                   font:{
                       size : 20
                   }
               }
            },

        }
    });
    // console.log(props.id, myChart);
    // console.log(myChart);
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
                    Sort(myChart1, props.sort, props.sortType);
                    break;
                case "myChart2":
                    Sort(myChart2, props.sort, props.sortType);
                    break;
                case "myChart3":
                    Sort(myChart3, props.sort, props.sortType);
                    break;
                case "myChart4":
                    Sort(myChart4, props.sort, props.sortType);
                    break;
                default:
                    console.log("Make chart error!");
            }
            
        }
    },[props.sort]);
    return <canvas className="graph" id= {props.id} width="400" height="400"></canvas>
}
export default Graph;