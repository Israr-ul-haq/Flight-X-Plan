import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Datatable from "../../components/Datatable";
import { getById } from "../../Services/JobsService";
import { columns } from "../../tabledata/CandidateData";

function ViewJob() {
  const [data, setData] = useState();
  const [loader, setLoader] = useState(true);
  const [data1, setData1] = useState();
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      debugger;
      const response = await getById(id);
      debugger;
      setData(response.data.data);
      setData1(response.data.data.applyJobs);
      setLoader(false);
    })();
  }, []); //eslint-disable-line

  const customStyles = {
    rows: {
      style: {
        backgroundColor: "#ECF0F3", // override the row height
      },
    },
    headCells: {
      style: {
        backgroundColor: "#ECF0F3",
      },
    },
    cells: {},
  };
  return (
    <>
      {" "}
      <Link to="/jobs">
        <div className="main_heading-section1">
          <div className="icon_back_box">
            <img src="/assets/images/icon_back.svg" alt="" />
          </div>
          <h1 className="main_heading">Jobs Management</h1>
        </div>
      </Link>
      <div className="dashboard_stats_card g70">
        <div className="view_person_card p_all w30 h450">
          {loader ? (
            <div className="loader_section">
              <div className="loader loader_color loader_size"></div>
            </div>
          ) : (
            <>
              <h1 className="main_heading fs30">Employer</h1>
              <div className="row">
                <div className="col-md-6">
                  <div className="pt50 user_constain">
                    <h4 className="view_primary_text primary_bold">
                      {data?.userFirstName + " " + data?.userLastName}
                    </h4>
                    <h4 className="view_secondary_text">
                      {data?.userPosition}
                    </h4>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="pt50 user_constain ">
                    <h4 className="view_primary_text primary_bold">
                      Job Detail
                    </h4>
                    <h4 className="view_secondary_text ">
                      {data?.description}
                    </h4>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="view_person_card p_all2  w70">
          <h1 className="main_heading fs30 pb40">Candidate</h1>
          <Datatable
            columns={columns(data1)}
            // totalRows={totalRows}
            // handlePerRowsChange={handlePerRowsChange}
            // handlePageChange={handlePageChange}
            incomingData={data1}
            // loading={loading}
            customStyles={customStyles}
          />
        </div>
      </div>
    </>
  );
}

export default ViewJob;
