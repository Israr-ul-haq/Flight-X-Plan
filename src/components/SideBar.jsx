import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function SideBar() {
  return (
    <>
      <div className="main_sidebar">
        <NavLink to="/">
          <div className="sidebar_icon_section">
            <img
              className="pl30 inactivesidebarimage"
              src="/assets/images/dashboard_inActive.svg"
              alt=""
            />
            <img
              className="pl30 activesidebarimage"
              src="/assets/images/dashboard_active.svg"
              alt=""
            />
          </div>
        </NavLink>
        <NavLink to="/employee">
          <div className="sidebar_icon_section pt55">
            <img
              className="pl30 inactivesidebarimage"
              src="/assets/images/employment_inActive.svg"
              alt=""
            />
            <img
              className="pl30 activesidebarimage"
              src="/assets/images/employment_man_active.svg"
              alt=""
            />
          </div>
        </NavLink>
        <NavLink to="/pilot">
          <div className="sidebar_icon_section pt55">
            <img
              className="pl30  inactivesidebarimage "
              src="/assets/images/pilot_inavtive.svg"
              alt=""
            />
            <img
              className="pl30 activesidebarimage"
              src="/assets/images/pilot_active.svg"
              alt=""
            />
          </div>
        </NavLink>
        <NavLink to="/jobs">
          <div className="sidebar_icon_section pt55">
            <img
              className="pl30  inactivesidebarimage "
              src="/assets/images/suitcase_inactive.svg"
              alt=""
            />
            <img
              className="pl30 activesidebarimage"
              src="/assets/images/suitcase_active.svg"
              alt=""
            />
          </div>
        </NavLink>
        <NavLink to="/configuration">
          <div className="sidebar_icon_section pt55">
            <img
              className="pl30  inactivesidebarimage "
              src="/assets/images/options.svg"
              alt=""
            />
            <img
              className="pl30 activesidebarimage"
              src="/assets/images/activeoptions.svg"
              alt=""
            />
          </div>
        </NavLink>
      </div>
    </>
  );
}
