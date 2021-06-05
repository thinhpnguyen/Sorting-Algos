import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

function Graph(){
    // const [nums, setNums] = useState([12, 11, 3, 5, 2, 4, 8, 9, 10]);
    // const [xAxis, setXAxis] = useState(['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'lol', 'lmao' , 'ok']);
    let nums = [12, 11, 3, 5, 2, 4];
    let xAxis = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
    useEffect(()=>{
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: xAxis,
                datasets: [{
                    label: '# of Votes',
                    data: nums,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
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

    let inputArr = myChart.data.datasets[0].data;
    //let colors = myChart.data.datasets[0].backgroundColor;
    let borderColors = myChart.data.datasets[0].borderColor;
    
    let n = inputArr.length;

    //used to slow down a loop
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }

    const sort = async () =>{
        for(let i = 0; i < n; i++) {
            // Finding the smallest number in the subarray
            let min = i;
            for(let j = i+1; j < n; j++){
                if(inputArr[j] < inputArr[min]) {
                    min=j; 
                }
                await sleep(200);
             }
             if (min !== i) {
                 // Swapping the elements
                 let tmp = inputArr[i]; 
                 //let colorTmp = colors[i];
                 let borderColorTmp = borderColors[i];

                 inputArr[i] = inputArr[min];
                 //colors[i] = colors[min];
                 borderColors[i] = borderColors[min];

                 inputArr[min] = tmp;
                // colors[min] = colorTmp;
                 borderColors[min] = borderColorTmp;

                 myChart.update();  
            }
           
        }
    }

    sort();
    
        
    });
    return <canvas id="myChart" width="400" height="400"></canvas>
}

export default Graph;