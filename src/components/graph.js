import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
let myChart;
function Graph(props){
    useEffect(()=>{
        makeChart();
    });

    function makeChart() {
        let nums = props.nums;
        let xAxis = props.label.split(' ', 20);
        var ctx = document.getElementById('myChart').getContext('2d');
        let backgroundColorArray = new Array(props.nums.length);
        backgroundColorArray.fill('rgba(255, 99, 132, 0.2)');
        //Have to destroy the old chart from the last render
        if ( typeof myChart !== "undefined") {
            myChart.destroy();
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
            colors[i] =  'rgba(255, 99, 132, 0.8)';
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

        if (props.reset){
            inputArr = props.nums;  //the sort function currently changing the props directly, fix later
            myChart.update();
            console.log(props.nums);
        }
        else if(props.sort){
            sort();
        }

    
        
    }
    return <canvas id="myChart" width="400" height="400"></canvas>
}

export default Graph;