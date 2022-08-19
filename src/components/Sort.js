import { highlight, unhighlight, highlightMin } from "./Graph";

let delay = 2;
export function Sort(type) {
  //let temp = myChart.data.datasets[0].data.slice(); // keep a copy for reset;
  let inputArr = myChart.data.datasets[0].data;
  let labels = myChart.data.labels;

  //let borderColors = myChart.chart.data.datasets[0].borderColor;

  let n = inputArr.length;

  //used to slow down a loop
}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

function swap(myChart, i, min) {
  let arr = myChart.data.datasets[0].data;
  let labels = myChart.data.labels;

  let tmp = arr[i];
  let labelTmp = labels[i];

  arr[i] = arr[min];
  labels[i] = labels[min];

  arr[min] = tmp;
  labels[min] = labelTmp;

  myChart.update();
}

export async function BubbleSort(myChart, sortEn) {
  let inputArr = myChart.data.datasets[0].data;
  let labels = myChart.data.labels;
  let n = inputArr.length;
  if (!sortEn) {
    // stop the for loop if reset mid-way
    return;
  }

  let i, j;
  for (i = 0; i < n - 1; i++) {
    //change color if ith column
    //highlight(i);
    for (j = 0; j < n - i - 1; j++) {
      highlight(myChart, j);
      if (inputArr[j] > inputArr[j + 1]) {
        highlight(myChart, j + 1);
        swap(myChart, j, j + 1);
      }
      await sleep(myChart, delay);
      unhighlight(myChart, j + 1);
      unhighlight(myChart, j);
    }
    //unhighlight(i);
  }
}

export async function SelectionSort(myChart, sortEn) {
  let inputArr = myChart.data.datasets[0].data;
  let n = inputArr.length;
  for (let i = 0; i < n; i++) {
    if (!sortEn) {
      // stop the for loop if reset mid-way
      return;
    }
    //change color if ith column
    highlight(i);

    // Finding the smallest number in the subarray
    let min = i;
    let exMin = i;
    for (let j = i + 1; j < n; j++) {
      //first hightlight the pointer
      highlight(j);
      if (inputArr[j] < inputArr[min]) {
        exMin = min;
        min = j;
      }
      await sleep(delay);
      unhighlight(j);

      //change the hightlight if min changes
      if (min !== exMin) {
        if (exMin !== i) {
          unhighlight(exMin);
        }
        highlightMin(min);
      }
    }
    if (min !== i) {
      unhighlight(min);
      // Swapping the elements and labels
      swap(myChart, min, i);
    }

    //change color back
    unhighlight(i);
  }
  // console.log(myChart.data.datasets[0].data)
  //console.log(inputArr)
}

function MergeSort() {
  const merge = async (arr, l, m, r) => {
    let n1 = m - l + 1;
    let n2 = r - m;

    // Create temp arrays
    let L = new Array(n1);
    let R = new Array(n2);

    // Copy data to temp arrays L[] and R[]
    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    // Merge the temp arrays back into arr[l..r]

    // Initial index of first subarray
    let i = 0;

    // Initial index of second subarray
    let j = 0;

    // Initial index of merged subarray
    let k = l;

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;
      myChart.update();
      await sleep(delay);
    }

    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
      myChart.update();
      await sleep(delay);
    }

    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
      myChart.update();
      await sleep(delay);
    }
  };
  const mergeSortHelper = async (arr, l, r) => {
    //console.log(l, r);
    if (l >= r) {
      return; //returns recursively
    }
    let m = l + parseInt((r - l) / 2);
    await mergeSortHelper(arr, l, m);
    await mergeSortHelper(arr, m + 1, r);
    await merge(arr, l, m, r);
  };
  const mergeSort = () => {
    mergeSortHelper(inputArr, 0, n - 1);
  };
}

function QuickSort() {
  async function partition(arr, low, high) {
    // pivot
    let pivot = arr[high];
    highlight(high);
    highlight(low);
    // Index of smaller element and
    // indicates the right position
    // of pivot found so far
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
      // If current element is smaller
      // than the pivot
      if (arr[j] < pivot) {
        // Increment index of
        // smaller element
        i++;
        swap(arr, i, j);
      }
      await sleep(delay);
    }
    //await sleep(delay);
    swap(arr, i + 1, high);
    unhighlight(high);
    unhighlight(low);
    return i + 1;
  }
  async function quickSortHelper(arr, low, high) {
    if (low < high) {
      // pi is partitioning index, arr[p]
      // is now at right place
      let pi = await partition(arr, low, high);

      // Separately sort elements before
      // partition and after partition
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    }
  }
  const quickSort = () => {
    quickSortHelper(inputArr, 0, n - 1);
  };
}
