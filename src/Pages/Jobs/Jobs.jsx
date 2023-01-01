import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Datatable from "../../components/Datatable";
import DataTableHeader from "../../components/Datatableheader";
import useComponentVisible from "../../hooks/UseComponentVisible";
import { get } from "../../Services/JobsService";
import { deleteSomething } from "../../Services/PilotService";
import { columnNames, columns, pdfHeaders } from "../../tabledata/JobsData";

function Jobs() {
  const [loader, setLoader] = useState(false);
  const [Loading, setLoading] = useState(false);

  const [filteredPdfData, setFilteredPdfData] = useState([]);
  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [
        elt.userFirstName + elt.userLastName,
        elt.title,
        elt.totalCandidates,
      ];
    });
    setFilteredPdfData(filteredData);
  };
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  useEffect(() => {
    getData(1);
  }, [loader]); //eslint-disable-line
  const getData = async (page) => {
    debugger;
    setLoading(true);
    const response = await get({ pageSize: perPage, pageNumber: page });
    setData(response.data.data.jobs);
    setTotalRows(response.data.data.total);
    filterPdfData(response.data.data.jobs);
    setLoader(true);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    getData(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await get({ pageSize: newPerPage, pageNumber: page });
    setData(response.data.data.jobs);
    filterPdfData(response.data.data.jobs);
    setPerPage(newPerPage);
    setLoading(false);
  };
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
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true);
  return (
    <>
      <div className="main_heading-section">
        <h1 className="main_heading">Jobs Management</h1>
      </div>
      <div className="data_table_layout">
        <DataTableHeader
          columnNames={columnNames}
          pdfHeaders={pdfHeaders}
          incomingFilteredData={filteredPdfData}
          incomingData={data}
          inComingName={"Jobs"}
          title={"Jobs Details"}
          // search={searchInput}
        />
        <Datatable
          columns={columns(
            data,
            deleteSomething,
            setLoader,
            ref,
            isComponentVisible,
            setIsComponentVisible
          )}
          totalRows={totalRows}
          handlePerRowsChange={handlePerRowsChange}
          handlePageChange={handlePageChange}
          incomingData={data}
          loading={Loading}
          customStyles={customStyles}
        />
      </div>
    </>
  );
}

export default Jobs;
