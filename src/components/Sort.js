

export function sequentialSort(myChart, sortEn){
    //let temp = myChart.data.datasets[0].data.slice(); // keep a copy for reset;
    let inputArr = myChart.chart.data.datasets[0].data;
    let labels = myChart.chart.data.labels;
    let colors = myChart.chart.data.datasets[0].backgroundColor;
    //let borderColors = myChart.chart.data.datasets[0].borderColor;
    
    let n = inputArr.length;

    //used to slow down a loop
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    function highlight(i){
        colors[i] =  'rgba(255, 99, 132, 0.8)';
        myChart.chart.update();
    }

    function unhighlight(i){
        colors[i] =  'rgba(255, 99, 132, 0.2)';
        myChart.chart.update();
    }

    function highlightMin(i){
        colors[i] =  'rgba(54, 162, 235, 0.2)';
        myChart.chart.update();
    }

    const sort = async () =>{
        for(let i = 0; i < n; i++) {
            if(!sortEn){ // stop the for loop if reset mid-way
                return;
            }
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

                myChart.chart.update();  
            }

            //change color back
            unhighlight(i);
        
        }
        // console.log(myChart.data.datasets[0].data)
        //console.log(inputArr)
    }
    sort();
}
