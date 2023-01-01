import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Datatable from "../../components/Datatable";
import DataTableHeader from "../../components/Datatableheader";
import useComponentVisible from "../../hooks/UseComponentVisible";
import { deleteSomething, get } from "../../Services/EmployeeService";
import { columnNames, columns, pdfHeaders } from "../../tabledata/EmployeeData";

function Employee() {
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
  const getData = async (page) => {
    debugger;
    setLoading(true);
    const response = await get({ pageSize: perPage, pageNumber: page });
    setData(response.data.data.recruiters);
    setTotalRows(response.data.data.total);
    filterPdfData(response.data.data.recruiters);
    setLoader(true);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    getData(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await get({ pageSize: newPerPage, pageNumber: page });
    setData(response.data.data.records);
    filterPdfData(response.data.data.records);
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

  // function useOutsideAlerter(ref) {
  //   useEffect(() => {
  //     /**
  //      * Alert if clicked on outside of element
  //      */

  //     function handleClickOutside(event) {
  //       if (ref.current && !ref.current.contains(event.target)) {
  //         debugger;

  //         // const el = document.querySelector(".actionContent");
  //         // el.classList.remove("block");
  //         document.querySelectorAll(".actionContent").forEach((item) => {
  //           item.classList.remove("block");
  //         });
  //       }
  //     }
  //     // Bind the event listener
  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //       // Unbind the event listener on clean up
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, [ref]);
  // }
  // const wrapperRef = useRef(null);
  // useOutsideAlerter(wrapperRef);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true);

  return (
    <>
      <div className="main_heading-section">
        <h1 className="main_heading">Recruiter Management</h1>
        <Link to="Add" className="Add_button">
          <img src="/assets/images/Icon awesome-plus.svg" alt="" />
          New Recruiter
        </Link>
      </div>
      <div className="data_table_layout">
        <DataTableHeader
          columnNames={columnNames}
          pdfHeaders={pdfHeaders}
          incomingFilteredData={filteredPdfData}
          incomingData={data}
          inComingName={"Recruiter"}
          title={"Recruiter"}
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

export default Employee;
