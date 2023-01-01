import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { getById } from "../../Services/PilotService";
import Swal from "sweetalert2";

function ViewPilot() {
  const [data, setData] = useState();
  const [loader, setLoader] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      debugger;
      const response = await getById(id);
      debugger;
      setData(response.data.data);
      setLoader(false);
    })();
  }, []); //eslint-disable-line

  const viewImage2 = () => {
    Swal.fire({
      imageUrl: data?.userJobDetails[0]?.resumePath,
      imageWidth: "100%",
      imageHeight: "100%",
      showCancelButton: false,
      showConfirmButton: false,
      background: "none",
    });
  };
  return (
    <>
      {" "}
      <Link to="/pilot">
        <div className="main_heading-section1">
          <div className="icon_back_box">
            <img src="/assets/images/icon_back.svg" alt="" />
          </div>
          <h1 className="main_heading">Pilots Detail</h1>
        </div>
      </Link>
      <div className="dashboard_stats_card g70">
        <div className="view_person_card p_all w40 h450">
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
                      {data?.firstName + " " + data?.lastName}
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
                    <h4 className="view_secondary_text ">{data?.address}</h4>
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
              <h1 className="main_heading fs30 pb30">Education</h1>
              <div className="row">
                <div className="col-md-4">
                  <div className="user_constain">
                    <h4 className="view_primary_text">School</h4>
                    <h4 className="view_secondary_text ">
                      {data?.userEducations[0]?.school}
                    </h4>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="user_constain">
                    <h4 className="view_primary_text">Degree</h4>
                    <h4 className="view_secondary_text ">
                      {data?.userEducations[0]?.degree}
                    </h4>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="user_constain">
                    <h4 className="view_primary_text">Your Field of Study</h4>
                    <h4 className="view_secondary_text ">
                      {data?.userEducations[0]?.studyField}
                    </h4>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="pt20 user_constain">
                    <h4 className="view_primary_text">Start Date</h4>
                    <h4 className="view_secondary_text ">
                      {" "}
                      {moment(data?.userEducations[0]?.startDate).format("L")}
                    </h4>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="pt20 user_constain">
                    <h4 className="view_primary_text">End Date</h4>
                    <h4 className="view_secondary_text ">
                      {" "}
                      {moment(data?.userEducations[0]?.endDate).format("L")}
                    </h4>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="pt20 user_constain">
                    <h4 className="view_primary_text">Description</h4>
                    <h4 className="view_secondary_text ">
                      {" "}
                      {data?.userEducations[0]?.description}
                    </h4>
                  </div>
                </div>
              </div>
              <h1 className="main_heading fs30 pt40 pb30">Job Detail</h1>
              <div className="row">
                <div className="col-md-4">
                  <div className="user_constain">
                    <h4 className="view_primary_text">Industry</h4>
                    <h4 className="view_secondary_text ">
                      {data?.userJobDetails[0]?.industryTitle}
                    </h4>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="user_constain">
                    <h4 className="view_primary_text">Employment Type</h4>
                    <h4 className="view_secondary_text ">
                      {data?.userJobDetails[0]?.employmentTypeTitle}
                    </h4>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="user_constain">
                    <h4 className="view_primary_text">Recent Job Title</h4>
                    <h4 className="view_secondary_text ">
                      {data?.userJobDetails[0]?.recentJobTitle}
                    </h4>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="pt20 user_constain">
                    <h4 className="view_primary_text">Skills</h4>
                    {data?.userSkills.map((item) => {
                      return (
                        <>
                          <h4 className="view_secondary_text ">
                            {item.skillsTitle}
                          </h4>
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="pt20 user_constain">
                    <h4 className="view_primary_text">Description</h4>
                    <h4 className="view_secondary_text ">
                      {data?.userJobDetails[0]?.description}
                    </h4>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="pt20 user_constain">
                    <button
                      type="submit"
                      className="save_button resume_btn"
                      onClick={viewImage2}
                    >
                      view Resume
                    </button>
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

export default ViewPilot;
