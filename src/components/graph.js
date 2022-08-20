import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
//import { BubbleSort } from "./Sort.js";

/*
This class is an adapter which takes care of creating or updating the graph.js object
It also adds more functionality such as highlighting
*/
class ChartWrapper {
  constructor(canvasId, data, title, height) {
    let backgroundColorArray = new Array(data.length);
    backgroundColorArray.fill("rgba(255, 99, 132, 0.2)");
    let ctx = document.getElementById(canvasId).getContext("2d");

    /* 
    This flag this used to stop the async sort functions to operate on the new data when reset
    Because the update methods will operate on new data array ref
    We can move the update the methods to the Sort module instead, as a second choice, so they will only update on the old data set
    Which the user will not see, 
     */
    this.flag = false;

    this.chart_ctx = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((v) => ""),
        datasets: [
          {
            label: title,
            data: data,
            backgroundColor: this.backgroundColorArray,
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            max: height,
            beginAtZero: true,
          },
        },
        responsive: false,
        animation: {
          duration: 0,
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
          title: {
            display: true,
            text: title,
            font: {
              size: 20,
            },
          },
        },
      },
    });
  }

  updateData() {
    this.chart_ctx.update();
  }
  updateChart(newData, max) {
    this.flag = false;
    this.chart_ctx.data.datasets[0].data = newData;
    this.chart_ctx.data.labels = newData.map((v) => "");
    let backgroundColorArray = new Array(newData.length);
    backgroundColorArray.fill("rgba(255, 99, 132, 0.2)");
    this.chart_ctx.data.datasets[0].backgroundColor = [...backgroundColorArray];
    this.chart_ctx.options.scales.y.max = max;
    this.updateData();
  }
  getChartCtx() {
    return this.chart_ctx;
  }
  getChartData() {
    return this.chart_ctx.data.datasets[0].data;
  }
  getChartLabels() {
    return this.chart_ctx.labels;
  }
  getFlag() {
    return this.flag;
  }
  /** Update Methods **/
  setFlag(val) {
    this.flag = val;
  }
  updateAnElement(i, val) {
    if (!this.flag) return;
    this.chart_ctx.data.datasets[0].data[i] = val;
  }

  highlight(i) {
    if (!this.flag) return;
    this.chart_ctx.data.datasets[0].backgroundColor[i] =
      "rgba(255, 99, 132, 0.8)";
    this.updateData();
  }

  unhighlight(i) {
    if (!this.flag) return;
    this.chart_ctx.data.datasets[0].backgroundColor[i] =
      "rgba(255, 99, 132, 0.2)";
    this.updateData();
  }

  highlightMin(i) {
    if (!this.flag) return;
    this.chart_ctx.data.datasets[0].backgroundColor[i] =
      "rgba(54, 162, 235, 0.2)";
    this.updateData();
  }

  swap(a, b) {
    if (!this.flag) return;
    let arr = this.chart_ctx.data.datasets[0].data;

    let tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;

    this.updateData();
  }
}

let Graph = (props) => {
  // props.reset in initialized to true to render the empty graph first
  let [graph_wrapper, setGraph] = useState(undefined);

  useEffect(() => {
    if (props.reset && graph_wrapper === undefined) {
      setGraph(
        new ChartWrapper(props.id, [...props.nums], props.sortType, props.max)
      );
    } else if (props.reset && graph_wrapper !== undefined) {
      graph_wrapper.updateChart([...props.nums], props.max);
    }
  }, [props.reset]);

  useEffect(() => {
    //console.log(props.sort);
    graph_wrapper && graph_wrapper.setFlag(props.sort);
    if (props.sort) {
      props.sortFunction(graph_wrapper);
    }
  }, [props.sort]);
  return (
    <canvas className="graph" id={props.id} width="400" height="400"></canvas>
  );
};
export default Graph;
