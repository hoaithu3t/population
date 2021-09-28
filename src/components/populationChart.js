import React, { useState, useEffect } from "react";

import { getPopulations } from "../api/population";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PopulationChart = ({ nameProvince, index }) => {
  const [populations, setPopulations] = useState([]);
  useEffect(() => {
    getPopulations(index + 1).then((res) => setPopulations(res.result));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const data = populations.data?.map((el) => ({
    name: el.label,
    data: el.data.map((el) => el.value),
    year: el.data.map((el) => el.year),
    marker: {
      symbol: "circle",
    },
    rate: el.data.map((el) => el.rate),
  }));
  const options = {
    title: {
      text: "人口推移",
    },
    subtitle: {
      text: nameProvince,
    },
    chart: {
      spacing: [20, 150, 20, 150],
    },
    colors: ["#FF7369", "#77D9A8", "#6CA7FF", "#D8F255"],
    yAxis: {
      title: null,
      labels: {
        format: "{value}人",
      },
      lineWidth: 1,
      lineColor: "#000",
      tickWidth: 1,
      tickColor: "#000",
      gridLineColor: "transparent",
    },
    xAxis: {
      crosshair: true,
      labels: {
        format: "{value}年",
      },
      tickWidth: 1,
      lineColor: "#000",
      tickColor: "#000",
    },
    plotOptions: {
      series: {
        pointStart: 1960,
        pointInterval: 5,
      },
    },
    tooltip: {
      shared: true,
      distance: -190,
      crosshairs: true,
      borderColor: "#6CA7FF",
      headerFormat: "<b>{point.key}年</b><br/>",
      valueSuffix: "人",
    },
    series: data,
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 1198,
          },
          chartOptions: {
            chart: {
              spacing: [20, 100, 20, 100],
            },
          },
        },
        {
          condition: {
            maxWidth: 768,
          },
          chartOptions: {
            chart: {
              spacing: [10, 50, 10, 50],
            },
          },
        },
        {
          condition: {
            maxWidth: 540,
          },
          chartOptions: {
            chart: {
              spacing: [10, 20, 10, 20],
            },
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
        {
          condition: {
            maxWidth: 414,
          },
          chartOptions: {
            chart: {
              spacing: [5, 10, 5, 10],
            },
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PopulationChart;
