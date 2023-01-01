import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Datatable from "../../components/Datatable";
import DataTableHeader from "../../components/Datatableheader";
import useComponentVisible from "../../hooks/UseComponentVisible";
import { deleteSomething, get } from "../../Services/PilotService";
import { columnNames, columns, pdfHeaders } from "../../tabledata/PilotData";

function Pilot() {
  const [loader, setLoader] = useState(false);
  const [Loading, setLoading] = useState(false);

  const [filteredPdfData, setFilteredPdfData] = useState([]);
  const filterPdfData = (data) => {
    const filteredData = data.map((elt) => {
      return [elt.firstName, elt.email, elt.phoneNumber, elt.address];
    });
    setFilteredPdfData(filteredData);
  };
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  useEffect(() => {
    getData(1);
  }, [loader]); //eslint-disable-line
  // const getData = async (page) => {
  //   debugger;
  //   setLoading(true);
  //   const response = await get({ pageSize: perPage, pageNumber: page });
  //   setData(response.data.data.pilots);
  //   setTotalRows(response.data.data.total);
  //   filterPdfData(response.data.data.pilots);
  //   setLoader(true);
  //   setLoading(false);
  // };
  const getData = async (page) => {
    debugger;
    setLoading(true);
    const formData = new FormData();

    formData.append("country_id", "1");
    const response = await get(formData);
    setData(response.data.data.pilots);
    setTotalRows(response.data.data.total);
    filterPdfData(response.data.data.pilots);
    setLoader(true);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    getData(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await get({ pageSize: newPerPage, pageNumber: page });
    setData(response.data.data.pilots);
    filterPdfData(response.data.data.pilots);
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
        <h1 className="main_heading">Pilots Management</h1>
        <Link to="Add" className="Add_button">
          <img src="/assets/images/Icon awesome-plus.svg" alt="" />
          New Pilots
        </Link>
      </div>
      <div className="data_table_layout">
        <DataTableHeader
          columnNames={columnNames}
          pdfHeaders={pdfHeaders}
          incomingFilteredData={filteredPdfData}
          incomingData={data}
          inComingName={"Pilot"}
          title={"Pilot"}
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

export default Pilot;
