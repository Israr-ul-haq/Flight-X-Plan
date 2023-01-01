import { useForm } from "react-hook-form";
import downloadCSV from "../helpers/ExportCSV";
import { exportPDF } from "../helpers/ExportPDF";

function DataTableHeader({
  incomingFilteredData,
  incomingData,
  inComingName,
  columnNames,
  pdfHeaders,
  title,
  search,
}) {
  return (
    <>
      <div className="dataTable_header pb60">
        <div className="datatable_header_flex">
          <h2 className="stats_heading">Export to:</h2>
          <button
            className="export_btn"
            onClick={(e) =>
              exportPDF(pdfHeaders, incomingFilteredData, inComingName)
            }
          >
            PDF
          </button>
          <button
            className="export_btn"
            onClick={(e) =>
              downloadCSV(incomingData, columnNames, inComingName)
            }
          >
            CSV
          </button>
        </div>
        <div className="input_contains">
          <input
            className="inputField input_max_width"
            placeholder="Search"
            type="text"
          />
        </div>
      </div>
    </>
  );
}

export default DataTableHeader;
