import React from "react";
import Bargraph2 from "./Bargraph2";
import Bargraphs from "./Bargraphs";
import Linegraph from "./Linegraph";

function Dashboard() {
  return (
    <>
      <div className="main_heading-section">
        <h1 className="main_heading">Dashboard</h1>
      </div>
      <div className="dashboard_stats_card">
        <div className="dashboard_stats_inner">
          <img src="/assets/images/user.svg" alt="" />
          <div>
            <h2 className="stats_heading">Total Users</h2>
            <h2 className="stats_numbers">6748</h2>
          </div>
        </div>
        <div className="dashboard_stats_inner">
          <img src="/assets/images/employment-man.svg" alt="" />
          <div>
            <h2 className="stats_heading">Total Employers</h2>
            <h2 className="stats_numbers">7896</h2>
          </div>
        </div>
        <div className="dashboard_stats_inner">
          <img src="/assets/images/Mask Group 41.svg" alt="" />
          <div>
            <h2 className="stats_heading">Total Pilots</h2>
            <h2 className="stats_numbers">300</h2>
          </div>
        </div>
        <div className="dashboard_stats_inner">
          <img src="/assets/images/suitcase.svg" alt="" />
          <div>
            <h2 className="stats_heading">Active Jobs</h2>
            <h2 className="stats_numbers">250</h2>
          </div>
        </div>
      </div>
      <div className="dashboard_stats_card dashboard_stats_card--graph">
        <Bargraphs />
        <Bargraph2 />
      </div>
      <h1 className="main_heading mb50">Monthly Jobs</h1>
      <div className="dashboard_stats_card">
        <Linegraph />
      </div>
    </>
  );
}

export default Dashboard;
