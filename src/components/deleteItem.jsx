import Swal from "sweetalert2";
const deleteItem = async (title, id, data, service, setLoader) => {
  debugger;
  Swal.fire({
    title: "Are you sure, you want to delete " + title + "?",
    showCancelButton: true,
    confirmButtonText: `Delete`,
    reverseButtons: true,
    closeButtonHtml: `<img src="/assets/images/cross-image.png" alt="crossicon" className="popupcrossimage"/>`,
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      debugger;
      setLoader(true);
      let removeIndex = data
        .map((item) => {
          return item.id;
        })
        .indexOf(id);
      data.splice(removeIndex, 1);
      debugger;
      const response = await service(id);
      if (response.data.code === 1) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: title + " deleted!",
        });
        setLoader(false);
      }

      if (response.data.Code === 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        setLoader(false);
      }
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
      setLoader(false);
    }
  });
};

export default deleteItem;
