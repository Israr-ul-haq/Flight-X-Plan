import { Link } from "react-router-dom";
import deleteItem from "../components/deleteItem";

export const columnNames = [
  {
    userFirstName: "",
    userLastName: "",
    title: "",
    totalCandidates: "",
  },
];

export const pdfHeaders = ["Full Name", "title", "Total Candidates"];

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
          <img src={row?.userProfilePhoto} className="table_image" alt="" />
        </>
      ),
      sortable: true,
      width: "50px",
      maxWidth: "50px",
    },

    {
      name: "Employer",
      cell: (row) => row["userFirstName"] + row["userLastName"],
      sortable: true,
      width: "290px",
    },
    {
      name: "Job Title",
      cell: (row) => row["title"],
      sortable: true,
      width: "400px",
    },
    {
      name: "Candidates",
      cell: (row) => row["totalCandidates"],
      sortable: true,
      width: "500px",
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
                  <Link to={`view/${row?.jobId}`}>
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
