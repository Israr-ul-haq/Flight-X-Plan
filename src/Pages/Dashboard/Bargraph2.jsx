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
function Bargraph2() {
  const [labels, setLabel] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);
  const [value, setValue] = useState([30, 20, 80, 50, 48, 90, 70]);
  const data = {
    labels,
    datasets: [
      {
        label: "Active Users",
        data: value,
        backgroundColor: "#00AB55",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        position: "top left",
      },
    },
  };
  return (
    <>
      <div className="graphs_inner graph_inner_width">
        <Bar options={options} data={data} />
      </div>
    </>
  );
}

export default Bargraph2;
