import { Link } from "react-router-dom";
import deleteItem from "../components/deleteItem";

export const columnNames = [
  {
    firstName: "",
    email: "",
    phoneNumber: "",
    address: "",
  },
];

export const pdfHeaders = ["First Name", "Email", "Phone Number", "Address"];

export const columns = (
  data,
  service,
  setLoader,
  ref,
  isComponentVisible,
  setIsComponentVisible
) => {
  const showMenu = (e) => {
    document.querySelectorAll(".actionContent").forEach((item) => {
      if (e.target.closest(".actionContent") === item) {
        item.classList.toggle("block");
        setIsComponentVisible(true);
      } else {
        item.classList.remove("block");
      }
    });
  };
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
      width: "150px",
      maxWidth: "150px",
    },
    {
      name: "",
      cell: (row) => (
        <>
          <img src={row?.profilePhoto} className="table_image" alt="" />
        </>
      ),
      sortable: true,
      width: "50px",
      maxWidth: "50px",
    },

    {
      name: "Full Name",
      cell: (row) => row["firstName"],
      sortable: true,
      width: "250px",
    },

    {
      name: "Email",
      cell: (row) => row["email"],
      sortable: true,
      width: "350px",
    },
    {
      name: "Phone Number",
      cell: (row) => row["phoneNumber"],
      sortable: true,
      width: "350px",
    },
    {
      name: "Address",
      cell: (row) => row["address"],
      sortable: true,
    },

    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <>
          <div className="actionContent" ref={ref}>
            <div onClick={showMenu}>
              <img
                className="img1"
                src="/assets/images/dropdown_dot.svg"
                alt=""
              />
            </div>
            {isComponentVisible && (
              <div className="dropdown">
                <div className="dropdown-content">
                  <Link to={`edit/${row?.id}`}>
                    <img
                      className="dropMainIcon"
                      src="/assets/images/Icon awesome-edit.svg"
                      alt=""
                    />
                    Edit
                  </Link>
                  <Link to={`view/${row?.id}`}>
                    <img
                      className="dropMainIcon"
                      src="/assets/images/View (1).svg"
                      alt=""
                    />
                    View
                  </Link>
                  <Link
                    to=""
                    onClick={() =>
                      deleteItem(
                        row.firstName,
                        row.id,
                        data,
                        service,
                        setLoader
                      )
                    }
                  >
                    <div className="unique_class">
                      <img
                        className="dropMainIcon"
                        src="/assets/images/Delete.svg"
                        alt=""
                      />
                      Delete
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </>
      ),
      width: "250px",
      maxWidth: "250px",
    },
  ];
};
