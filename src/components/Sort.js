

export function Sort(myChart, sortEn, type){
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

    const selectionSort = async () =>{
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
    function swap(arr, i, min)
    {
        let tmp = inputArr[i]; 
        let labelTmp = labels[i];
    

        arr[i] = arr[min];
        labels[i] = labels[min];

        arr[min] = tmp;
        labels[min] = labelTmp;

        myChart.chart.update(); 
    };
    const bubbleSort = async () => {
        if(!sortEn){ // stop the for loop if reset mid-way
            return;
        }

        let i, j;
        for (i = 0; i < n-1; i++)
        {
            //change color if ith column
            //highlight(i);
            for (j = 0; j < n-i-1; j++)
            {
                highlight(j);
                if (inputArr[j] > inputArr[j+1])
                {
                    highlight(j+1);
                    swap(inputArr,j,j+1);
                }
                await sleep(50);
                unhighlight(j+1);
                unhighlight(j);
            }
            //unhighlight(i);
        }
    }
    switch(type){
        case "Selection Sort":
            selectionSort();
            break;
        case "Bubble Sort":
            bubbleSort();
            break;
        default:
            console.log("Sort Error");
    }
}

