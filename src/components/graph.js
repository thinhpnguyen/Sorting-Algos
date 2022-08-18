import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Sort } from "./Sort.js";

function makeChart(props, chart_ctx, setGraph) {
  let nums = props.nums.slice(); //copy by value
  var ctx = document.getElementById(props.id).getContext("2d");
  let backgroundColorArray = new Array(nums.length);
  backgroundColorArray.fill("rgba(255, 99, 132, 0.2)");

  //For the subsequent renders, only need to update
  if (typeof chart_ctx !== "undefined") {
    chart_ctx.data.datasets[0].data = nums;
    chart_ctx.data.labels = nums.map((v) => "");
    chart_ctx.data.datasets[0].backgroundColor = backgroundColorArray.slice();
    chart_ctx.options.scales.y.max = props.max;
    chart_ctx.update();
    return;
  }
  setGraph(
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: nums.map((v) => ""),
        datasets: [
          {
            label: props.sortType,
            data: nums,
            backgroundColor: backgroundColorArray,
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            max: props.max,
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
            text: props.sortType,
            font: {
              size: 20,
            },
          },
        },
      },
    })
  );
}

function Graph(props) {
  // props.reset in initialized to true to render the empty graph first
  let [graph_ctx, setGraph] = useState(undefined);
  useEffect(() => {
    if (props.reset) {
      makeChart(props, graph_ctx, setGraph);
    }
  }, [props.reset]);

  useEffect(() => {
    if (props.sort) {
      Sort(graph_ctx, props.sort, props.sortType);
    }
  }, [props.sort]);
  return (
    <canvas className="graph" id={props.id} width="400" height="400"></canvas>
  );
}
export default Graph;
