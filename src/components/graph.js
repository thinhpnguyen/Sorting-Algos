import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js/auto';

function Graph(){
    const [array, setArray] = useState([12, 11, 3, 5, 2, 4, 8, 9, 10]);
   // const []
    useEffect(()=>{
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'lol', 'lmao' , 'ok'],
                datasets: [{
                    label: '# of Votes',
                    data: array,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
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
                }
            }
        });
        setInterval(()=>{

        }, 1000);
    });
    return <canvas id="myChart" width="200" height="200"></canvas>
}

export default Graph;