let delay = 50;

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export async function BubbleSort(ChartWrapper) {
  let inputArr = ChartWrapper.getChartData();
  //let labels = myChart.data.labels;
  let n = inputArr.length;

  let i, j;
  for (i = 0; i < n; i++) {
    for (j = 0; j < n - i; j++) {
      if (!ChartWrapper.getFlag()) return;
      ChartWrapper.highlight(j);
      if (inputArr[j] > inputArr[j + 1]) {
        ChartWrapper.highlight(j + 1);
        ChartWrapper.swap(j, j + 1);
      }
      await sleep(delay);
      ChartWrapper.unhighlight(j + 1);
      ChartWrapper.unhighlight(j);
    }
  }
}

export async function SelectionSort(ChartWrapper) {
  let inputArr = ChartWrapper.getChartData();
  let n = inputArr.length;
  for (let i = 0; i < n; i++) {
    //change color if ith column
    ChartWrapper.highlight(i);

    // Finding the smallest number in the subarray
    let min = i;
    let exMin = i;
    for (let j = i + 1; j < n; j++) {
      if (!ChartWrapper.getFlag()) return;
      //first hightlight the pointer
      ChartWrapper.highlight(j);
      if (inputArr[j] < inputArr[min]) {
        exMin = min;
        min = j;
      }
      await sleep(delay);
      ChartWrapper.unhighlight(j);

      //change the hightlight if min changes
      if (min !== exMin) {
        if (exMin !== i) {
          ChartWrapper.unhighlight(exMin);
        }
        ChartWrapper.highlightMin(min);
      }
    }
    if (min !== i) {
      ChartWrapper.unhighlight(min);
      // Swapping the elements and labels
      ChartWrapper.swap(min, i);
    }

    //change color back
    ChartWrapper.unhighlight(i);
  }
}

export function MergeSort(ChartWrapper) {
  const merge = async (arr, l, m, r) => {
    if (!ChartWrapper.getFlag()) return;
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
      if (!ChartWrapper.getFlag()) return;
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;
      ChartWrapper.updateData();
      await sleep(delay);
    }

    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
      if (!ChartWrapper.getFlag()) return;
      arr[k] = L[i];
      i++;
      k++;
      ChartWrapper.updateData();
      await sleep(delay);
    }

    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
      if (!ChartWrapper.getFlag()) return;
      arr[k] = R[j];
      j++;
      k++;
      ChartWrapper.updateData();
      await sleep(delay);
    }
  };
  const mergeSortHelper = async (arr, l, r) => {
    if (!ChartWrapper.getFlag()) return;

    if (l >= r) {
      return; //returns recursively
    }
    let m = l + parseInt((r - l) / 2);
    await mergeSortHelper(arr, l, m);
    await mergeSortHelper(arr, m + 1, r);
    await merge(arr, l, m, r);
  };
  (function () {
    let inputArr = ChartWrapper.getChartData();
    let n = inputArr.length;
    mergeSortHelper(inputArr, 0, n - 1);
  })();
}

export function QuickSort(ChartWrapper) {
  async function partition(arr, low, high) {
    if (!ChartWrapper.getFlag()) return;
    // pivot
    let pivot = arr[high];
    ChartWrapper.highlight(high);
    ChartWrapper.highlight(low);
    // Index of smaller element and
    // indicates the right position
    // of pivot found so far
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
      if (!ChartWrapper.getFlag()) return;
      // If current element is smaller
      // than the pivot
      if (arr[j] < pivot) {
        // Increment index of
        // smaller element
        ++i;
        ChartWrapper.swap(i, j);
      }
      await sleep(delay);
    }
    //await sleep(delay);
    ChartWrapper.swap(i + 1, high);
    ChartWrapper.unhighlight(high);
    ChartWrapper.unhighlight(low);
    return i + 1;
  }
  async function quickSortHelper(arr, low, high) {
    if (!ChartWrapper.getFlag()) return;
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
  (function quickSort() {
    let inputArr = ChartWrapper.getChartData();
    let n = inputArr.length;
    quickSortHelper(inputArr, 0, n - 1);
  })();
}
