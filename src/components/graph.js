import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

function Graph(props){
    useEffect(()=>{
        let nums = [12, 11, 3, 5, 2, 4, 33, 21, 13, 7, 10];
        let xAxis = ['12', '11', '3', '5', '2', '4', '33', '21', '13', '7', '10'];
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: xAxis,
                datasets: [{
                    label: '# of Votes',
                    data: nums,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 99, 132, 0.2)'
                
                    ],
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
        let inputArr = myChart.data.datasets[0].data;
        let labels = myChart.data.labels;
        let colors = myChart.data.datasets[0].backgroundColor;
        //let borderColors = myChart.data.datasets[0].borderColor;
        
        let n = inputArr.length;

        //used to slow down a loop
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }

        function highlight(i){
            colors[i] =  'rgba(255, 99, 132, 1)';
            myChart.update();
        }

        function unhighlight(i){
            colors[i] =  'rgba(255, 99, 132, 0.2)';
            myChart.update();
        }

        function highlightMin(i){
            colors[i] =  'rgba(54, 162, 235, 0.2)';
            myChart.update();
        }

        const sort = async () =>{
            for(let i = 0; i < n; i++) {
                //change color if ith column
                highlight(i);

                // Finding the smallest number in the subarray
                let min = i;
                let exMin = i;
                for(let j = i+1; j < n; j++){
                    //first hightlight the pointer
                    highlight(j);
                    if(inputArr[j] < inputArr[min]) {
                        exMin = min;
                        min=j;

                    }
                    await sleep(50);
                    unhighlight(j);

                    //change the hightlight if min changes
                    if (min !== exMin){
                        if(exMin !== i){
                            unhighlight(exMin);
                        }
                        highlightMin(min);
                    }
                }
                if (min !== i) {
                    unhighlight(min);
                    // Swapping the elements and labels
                    let tmp = inputArr[i]; 
                    let labelTmp = labels[i];
                

                    inputArr[i] = inputArr[min];
                    labels[i] = labels[min];

                    inputArr[min] = tmp;
                    labels[min] = labelTmp;

                    myChart.update();  
                }

                //change color back
                unhighlight(i);
            
            }
        }
        sort();
    
    
        
    });
    return <canvas id="myChart" width="400" height="400"></canvas>
}

export default Graph;