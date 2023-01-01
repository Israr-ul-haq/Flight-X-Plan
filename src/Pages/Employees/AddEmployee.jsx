import React, { useState } from "react";
import { Link } from "react-router-dom";
import useDisplayImage from "../../hooks/UseUploadImage";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  save,
  uploadImage as uploadImageApi,
} from "../../Services/EmployeeService";

function AddEmployee() {
  const [uploadImage, setUploadImage] = useState(null);
  const { result, uploader } = useDisplayImage();
  const [validationErrors, setValidationErrors] = useState({
    uploadImageFirstError: false,
    paswordValidation: false,
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [loader, setloader] = useState(true);
  const [btnLock, setBtnLock] = useState(false);
  const navigate = useNavigate();
  const Submit = async (formData) => {
    const validationErrorsCopy = { ...validationErrors };
    let validCount = 0;
    if (uploadImage === null) {
      validationErrorsCopy.uploadImageFirstError = true;
      validCount++;
    } else {
      validationErrorsCopy.uploadImageFirstError = false;
    }

    if (formData.confirmPassword !== formData.password) {
      validationErrorsCopy.paswordValidation = true;
      validCount++;
    } else {
      validationErrorsCopy.paswordValidation = false;
    }
    setValidationErrors(validationErrorsCopy);
    if (validCount > 0) {
      return true;
    }
    setBtnLock(true);
    debugger;
    const finalData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      recruiterBusinessDetails: [
        {
          joiningDate: formData.joiningDate,
          company: formData.company,
          position: formData.position,
          airCraft: formData.airCraft,
          description: formData.description,
        },
      ],
    };
    const formData1 = new FormData();
    formData1.append("file", uploadImage);
    const imageResponse = await uploadImageApi(formData1);
    finalData.ProfilePhoto = imageResponse.data.data.path;

    const response = await save(finalData);
    if (response.data.code === 1) {
      setBtnLock(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: response.data.data.message,
        showConfirmButton: true,
        timer: 5000,
      });
      setTimeout(() => {
        navigate("/employee");
      }, 0);
    }
    if (response.data.code === 0) {
      setBtnLock(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: response.data.data.message,
        showConfirmButton: true,
        timer: 5000,
      });
    }
  };

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };
  return (
    <>
      <Link to="/employee">
        <div className="main_heading-section1">
          <div className="icon_back_box">
            <img src="/assets/images/icon_back.svg" alt="" />
          </div>
          <h1 className="main_heading">Recruiter Detail</h1>
        </div>
      </Link>
      <div className="dashboard_stats_card g40">
        <div className="image_upload_card">
          <div className="border_circle">
            <label for="uploadImage">
              <div className="image_circle">
                <div>
                  <img
                    src="/assets/images/camera.svg"
                    style={{ paddingLeft: "30px", paddingTop: "15px" }}
                    alt=""
                  />
                  <p className="photo_text">Upload photo</p>
                </div>
              </div>
              {result ? (
                <img
                  alt="upload-img"
                  src={result ? result : ""}
                  className="uploaded_image"
                />
              ) : (
                ""
              )}
            </label>
            <input
              id="uploadImage"
              name="uploadImage"
              type={"file"}
              className="image_input"
              onChange={(e) => {
                setUploadImage(e.target.files[0]);
                uploader(e);
              }}
            />
          </div>
          {validationErrors.uploadImageFirstError ? (
            <p className="error_validation">Image is Required</p>
          ) : (
            ""
          )}
        </div>
        <div className="section_card w60 card_padding_section">
          <h1 className="main_heading fs30 mb30">Personal Details</h1>
          <form onSubmit={handleSubmit(Submit)}>
            <div className="row">
              <div className="col-md-6 mb20">
                <label className="input_label">First Name</label>
                <input
                  className="inputField mxWidth100"
                  placeholder="First Name"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName?.type === "required" && (
                  <p className="error_validation">First name is required</p>
                )}
              </div>
              <div className="col-md-6 mb20">
                <label className="input_label">Last Name</label>
                <input
                  className="inputField mxWidth100"
                  placeholder="Last Name"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName?.type === "required" && (
                  <p className="error_validation">Last name is required</p>
                )}
              </div>
              <div className="col-md-6 mb20">
                <label className="input_label">Phone Number</label>
                <input
                  maxLength={11}
                  onInput={maxLengthCheck}
                  type="number"
                  className="inputField mxWidth100"
                  placeholder="+92876578973"
                  {...register("phoneNumber", { required: true })}
                />
                {errors.phoneNumber?.type === "required" && (
                  <p className="error_validation">Phone number is required</p>
                )}
              </div>
              <div className="col-md-6 mb20">
                <label className="input_label">Your Email</label>
                <input
                  type="email"
                  className="inputField mxWidth100"
                  placeholder="jds@gmail.com"
                  {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && (
                  <p className="error_validation">Email is required</p>
                )}
              </div>
              <div className="col-md-6 mb20">
                <label className="input_label">Password</label>
                <input
                  type="password"
                  className="inputField mxWidth100"
                  placeholder="*********"
                  {...register("password", { required: true })}
                />
                {errors.password?.type === "required" && (
                  <p className="error_validation">Password is required</p>
                )}
              </div>
              <div className="col-md-6 mb20">
                <label className="input_label">Confirm Password</label>
                <input
                  type="password"
                  className="inputField mxWidth100"
                  placeholder="*********"
                  {...register("confirmPassword", { required: true })}
                />
                {errors.confirmPassword?.type === "required" && (
                  <p className="error_validation"> Password does not match</p>
                )}
                {validationErrors.paswordValidation ? (
                  <p className="error_validation">Password must be matching</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-6 mb20">
                <label className="input_label">Enter Your Address</label>
                <input
                  type="text"
                  className="inputField mxWidth100"
                  placeholder="Location"
                  {...register("address", { required: true })}
                />
                {errors.address?.type === "required" && (
                  <p className="error_validation">Address is required</p>
                )}
              </div>
              <h1 className="main_heading fs30 mb30 pt10">Business Detail</h1>

              <div className="col-md-6 mb20">
                <label className="input_label">Company</label>
                <input
                  type="text"
                  className="inputField mxWidth100"
                  placeholder="Company"
                  {...register("company", { required: true })}
                />
                {errors.company?.type === "required" && (
                  <p className="error_validation">Company is required</p>
                )}
              </div>
              <div className="col-md-6 mb20">
                <label className="input_label">Position</label>
                <input
                  type="text"
                  className="inputField mxWidth100"
                  placeholder="Position"
                  {...register("position", { required: true })}
                />
                {errors.company?.type === "required" && (
                  <p className="error_validation">Position is required</p>
                )}
              </div>
              <div className="col-md-6 mb20">
                <label className="input_label">Aircraft</label>
                <input
                  className="inputField mxWidth100"
                  placeholder="Aircraft"
                  {...register("airCraft", { required: true })}
                />
                {errors.airCraft?.type === "required" && (
                  <p className="error_validation">Aircraft is required</p>
                )}
              </div>
              {/* <div className="col-md-6">
              <label className="input_label">Salary</label>
              <input
                className="inputField mxWidth100"
                placeholder="Salary"
              />
            </div> */}
              <div className="col-md-6 mb20">
                <label className="input_label">Joining Date</label>
                <input
                  type="date"
                  className="inputField mxWidth100 pr20"
                  placeholder="Date Posted"
                  {...register("joiningDate", { required: true })}
                />
                {errors.joiningDate?.type === "required" && (
                  <p className="error_validation">Joining date is required</p>
                )}
              </div>
              <div className="col-md-12 mb20">
                <label for="w3review" className="input_label">
                  Description
                </label>
                <textarea
                  className="inputField mxWidth100"
                  placeholder="Description"
                  rows="7"
                  cols="10"
                  {...register("description", { required: true })}
                ></textarea>
                {errors.description?.type === "required" && (
                  <p className="error_validation">Description is required</p>
                )}
              </div>
              <div className="button_section">
                <Link to="/employee">
                  <button className="cancel_button">Cancel</button>
                </Link>
                <button type="submit" className="save_button">
                  {btnLock ? (
                    <div
                      className="loader loader_color"
                      style={{ margin: "0 20px" }}
                    ></div>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddEmployee;
