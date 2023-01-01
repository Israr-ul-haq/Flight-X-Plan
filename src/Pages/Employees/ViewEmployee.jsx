import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getById } from "../../Services/EmployeeService";

function ViewEmployee() {
  const [data, setData] = useState();
  const [loader, setLoader] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      debugger;
      const response = await getById(id);
      debugger;
      setData(response.data.data[0]);
      setLoader(false);
    })();
  }, []); //eslint-disable-line
  return (
    <>
      {" "}
      <Link to="/employee">
        <div className="main_heading-section1">
          <div className="icon_back_box">
            <img src="/assets/images/icon_back.svg" alt="" />
          </div>
          <h1 className="main_heading">Employer Detail</h1>
        </div>
      </Link>
      <div className="dashboard_stats_card g70">
        <div className="view_person_card p_all w40">
          {loader ? (
            <div className="loader_section">
              <div className="loader loader_color loader_size"></div>
            </div>
          ) : (
            <>
              <div className="view_image_contains">
                <img
                  src={
                    data?.profilePhoto
                      ? data?.profilePhoto
                      : "/assets/images/user_image.png"
                  }
                  className="user_image"
                  alt=""
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="pt50 user_constain pl20">
                    <h4 className="view_primary_text">Name</h4>
                    <h4 className="view_secondary_text ">
                      {data?.firstName + data?.lastName}
                    </h4>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="pt50 user_constain pl20">
                    <h4 className="view_primary_text">Email</h4>
                    <h4 className="view_secondary_text ">{data?.email}</h4>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="pt20 user_constain pl20">
                    <h4 className="view_primary_text">Phone Number</h4>
                    <h4 className="view_secondary_text ">
                      {data?.phoneNumber}
                    </h4>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="pt20 user_constain pl20">
                    <h4 className="view_primary_text">Password</h4>
                    <h4 className="view_secondary_text ">*********</h4>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="pt20 user_constain pl20">
                    <h4 className="view_primary_text">Your Location</h4>
                    <h4 className="view_secondary_text">{data?.address}</h4>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="view_person_card p_all1  w60">
          {loader ? (
            <div className="loader_section">
              <div className="loader loader_color loader_size"></div>
            </div>
          ) : (
            <>
              <h1 className="main_heading fs30 pb100">Business Detail</h1>
              <div className="row">
                <div className="col-md-4">
                  <div className="user_constain">
                    <h4 className="view_primary_text">Date Posted</h4>
                    <h4 className="view_secondary_text ">
                      {moment(data?.createdOn).format("L")}
                    </h4>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="user_constain">
                    <h4 className="view_primary_text">Company</h4>
                    <h4 className="view_secondary_text ">
                      {data?.recruiterBusinessDetails[0].company}
                    </h4>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="user_constain">
                    <h4 className="view_primary_text">Position</h4>
                    <h4 className="view_secondary_text ">
                      {" "}
                      {data?.recruiterBusinessDetails[0].position}
                    </h4>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="pt20 user_constain">
                    <h4 className="view_primary_text">Aircraft</h4>
                    <h4 className="view_secondary_text ">
                      {" "}
                      {data?.recruiterBusinessDetails[0]?.airCraft}
                    </h4>
                  </div>
                </div>
                {/* <div className="col-md-4">
              <div className="pt20 user_constain">
                <h4 className="view_primary_text">Salary</h4>
                <h4 className="view_secondary_text ">Salary</h4>
              </div>
            </div> */}
                <div className="col-md-4">
                  <div className="pt20 user_constain">
                    <h4 className="view_primary_text">Description</h4>
                    <h4 className="view_secondary_text ">
                      {" "}
                      {data?.recruiterBusinessDetails[0]?.description}
                    </h4>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewEmployee;
