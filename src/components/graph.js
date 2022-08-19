import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
//import { Sort } from "./Sort.js";

class ChartWrapper {
  constructor(canvasId, data, title, height) {
    this.backgroundColorArray = new Array(data.length);
    this.backgroundColorArray.fill("rgba(255, 99, 132, 0.2)");
    let ctx = document.getElementById(canvasId).getContext("2d");

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

  updateChart(newData, max) {
    this.chart_ctx.data.datasets[0].data = newData;
    this.chart_ctx.data.labels = newData.map((v) => "");
    this.chart_ctx.data.datasets[0].backgroundColor = [
      ...this.backgroundColorArray,
    ];
    this.chart_ctx.options.scales.y.max = max;
    this.chart_ctx.update();
  }
  getChartCtx() {
    return this.chart_ctx;
  }

  highlight(i) {
    let colors = this.chart_ctx.data.datasets[0].backgroundColor;
    colors[i] = "rgba(255, 99, 132, 0.8)";
    this.chart_ctx.update();
  }

  unhighlight(myChart, i) {
    let colors = this.chart_ctx.data.datasets[0].backgroundColor;
    colors[i] = "rgba(255, 99, 132, 0.2)";
    this.chart_ctx.update();
  }

  highlightMin(myChart, i) {
    let colors = this.chart_ctx.data.datasets[0].backgroundColor;
    colors[i] = "rgba(54, 162, 235, 0.2)";
    this.chart_ctx.update();
  }
}
// function makeChart(props, chart_ctx, setGraph) {
//   let nums = [...props.nums]; //copy by value
//   var ctx = document.getElementById(props.id).getContext("2d");
//   let backgroundColorArray = new Array(nums.length);
//   backgroundColorArray.fill("rgba(255, 99, 132, 0.2)");

//   //For the subsequent renders, only need to update
//   if (typeof chart_ctx !== "undefined") {
//     chart_ctx.data.datasets[0].data = nums;
//     chart_ctx.data.labels = nums.map((v) => "");
//     chart_ctx.data.datasets[0].backgroundColor = backgroundColorArray.slice();
//     chart_ctx.options.scales.y.max = props.max;
//     chart_ctx.update();
//     return;
//   }
//   setGraph(
//     new Chart(ctx, {
//       type: "bar",
//       data: {
//         labels: nums.map((v) => ""),
//         datasets: [
//           {
//             label: props.sortType,
//             data: nums,
//             backgroundColor: backgroundColorArray,
//             borderColor: "rgba(255, 99, 132, 1)",
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: {
//         scales: {
//           y: {
//             max: props.max,
//             beginAtZero: true,
//           },
//         },
//         responsive: false,
//         animation: {
//           duration: 0,
//         },
//         plugins: {
//           legend: {
//             display: false,
//           },
//           tooltip: {
//             enabled: false,
//           },
//           title: {
//             display: true,
//             text: props.sortType,
//             font: {
//               size: 20,
//             },
//           },
//         },
//       },
//     })
//   );
// }

// export function highlight(myChart, i) {
//   let colors = myChart.data.datasets[0].backgroundColor;
//   colors[i] = "rgba(255, 99, 132, 0.8)";
//   myChart.update();
// }

// export function unhighlight(myChart, i) {
//   let colors = myChart.data.datasets[0].backgroundColor;
//   colors[i] = "rgba(255, 99, 132, 0.2)";
//   myChart.update();
// }

// export function highlightMin(myChart, i) {
//   let colors = myChart.data.datasets[0].backgroundColor;
//   colors[i] = "rgba(54, 162, 235, 0.2)";
//   myChart.update();
// }

let Graph = React.memo((props) => {
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
    if (props.sort) {
      //Sort(graph_ctx, props.sort, props.sortType);
    }
  }, [props.sort]);
  return (
    <canvas className="graph" id={props.id} width="400" height="400"></canvas>
  );
});
export default Graph;
