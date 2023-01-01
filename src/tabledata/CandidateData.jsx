import moment from "moment";
import { Link } from "react-router-dom";
import deleteItem from "../components/deleteItem";
import { Button, Menu, MenuItem, MenuList } from "@mui/material";

export const columnNames = [
  {
    customerName: "",
    technicianName: "",
    serviceType: "",
    Date: "",
    paymentHistoryTotalAmount: "",
  },
];

export const pdfHeaders = [
  "Customer Name",
  "Technician Name",
  "Service Type",
  "Date",
  "Total Amount",
];

export const columns = (data) => {
  return [
    {
      name: "Sr#",
      cell: (row, index) => {
        if (index < 9) {
          return "0" + (index + 1);
        } else {
          return index + 1;
        }
      },
      sortable: true,
    },

    {
      name: "Name",
      cell: (row) => row["userFirstName"] + row["userLastName"],
      sortable: true,
    },

    {
      name: "Verified",
      button: true,
      cell: (row) => (
        <>
          {row.isHire ? (
            <img
              src="/assets/images/verified.svg"
              className="user_image1"
              alt=""
            />
          ) : (
            ""
          )}
        </>
      ),
    },
  ];
};
