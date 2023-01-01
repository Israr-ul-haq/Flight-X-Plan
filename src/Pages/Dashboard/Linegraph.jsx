import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function Linegraph() {
  const [labels, setLabel] = useState(["Jan", "Feb", "Mar"]);

  const [value, setValue] = useState([50, 60, 80]);

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Jobs",
        data: value,

        borderColor: "#1AA7EC",
        backgroundColor: "#193566",
        yAxisID: "y",
      },
    ],
  };
  return (
    <>
      <div className="graphs_inner linegraph_width">
        <Line options={options} data={data} />
      </div>
    </>
  );
}

export default Linegraph;
