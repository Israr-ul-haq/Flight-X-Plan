import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useDisplayImage from "../../hooks/UseUploadImage";
import {
  getById,
  getLookupsEmployType,
  getLookupsIndustry,
  getLookupSkills,
  save,
  update,
  uploadImage as uploadImageApi,
} from "../../Services/PilotService";
import Select from "react-select";
import useDisplayImage1 from "../../hooks/UseUploadImage1";
import moment from "moment";

function EditPilot() {
  const [uploadImage, setUploadImage] = useState(null);
  const [uploadImage1, setUploadImage1] = useState(null);
  const { result, uploader, setResult } = useDisplayImage();
  const { result1, uploader1, setResult1 } = useDisplayImage1();
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [imageText, setImageText] = useState(false);
  const [industry, setIndustry] = useState();
  const [employee, setEmployee] = useState();
  const [skill, setSkill] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [finalSkillData, setFinalSkillData] = useState();

  const [validationErrors, setValidationErrors] = useState({
    uploadImageFirstError: false,
    uploadImageSecondError: false,
    industryError: false,
  });
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [loader, setloader] = useState(true);
  const [btnLock, setBtnLock] = useState(false);
  const navigate = useNavigate();
  const Submit = async (formData) => {
    const validationErrorsCopy = { ...validationErrors };
    let validCount = 0;
    // if (uploadImage === null) {
    //   validationErrorsCopy.uploadImageFirstError = true;
    //   validCount++;
    // } else {
    //   validationErrorsCopy.uploadImageFirstError = false;
    // }
    // if (uploadImage1 === null) {
    //   validationErrorsCopy.uploadImageSecondError = true;
    //   validCount++;
    // } else {
    //   validationErrorsCopy.uploadImageSecondError = false;
    // }
    if (formData.industry === "0") {
      validationErrorsCopy.industryError = true;
      validCount++;
    } else {
      validationErrorsCopy.industryError = false;
    }
    if (formData.employmentTypeId === "0") {
      validationErrorsCopy.employeeError = true;
      validCount++;
    } else {
      validationErrorsCopy.employeeError = false;
    }

    if (formData.confirmPassword !== formData.password) {
      setPasswordValidation(true);
      return false;
    } else {
      setPasswordValidation(false);
    }
    setValidationErrors(validationErrorsCopy);
    if (validCount > 0) {
      return true;
    }
    setBtnLock(true);
    debugger;
    const finalData = {
      Id: id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      ProfilePhoto: "",
      userJobDetails: [
        {
          industryId: formData.industryId,
          employmentTypeId: formData.employmentTypeId,
          resumePath: "",
          description: formData.description,
          recentJobTitle: formData.recentJobTitle,
        },
      ],

      userSkills: finalSkillData.map((item) => {
        return {
          skillId: item.skillId,
        };
      }),

      userEducations: [
        {
          school: formData.school,
          degree: formData.degree,
          studyField: formData.studyField,
          startDate: formData.startDate,
          endDate: formData.endDate,
          description: formData.description,
        },
      ],
    };
    if (uploadImage !== null) {
      const formData1 = new FormData();
      formData1.append("file", uploadImage);
      const imageResponse = await uploadImageApi(formData1);
      finalData.ProfilePhoto = imageResponse.data.data.path;
    }
    if (uploadImage1 !== null) {
      const formData2 = new FormData();
      formData2.append("file", uploadImage1);
      const imageResponse1 = await uploadImageApi(formData2);
      finalData.userJobDetails[0].resumePath = imageResponse1.data.data.path;
    }

    const response = await update(finalData);
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
        navigate("/pilot");
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
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      setloader(true);
      const response = await getLookupsIndustry();
      const response1 = await getLookupsEmployType();
      const response2 = await getLookupSkills();
      const response3 = await getById(id);
      debugger;
      setIndustry(response.data.data.industry);
      setEmployee(response1.data.data.employmentType);
      setSkill(response2.data.data);
      setFinalSkillData(response3.data.data.userSkills);
      setResult(response3.data.data.profilePhoto);
      if (response3.data.data.userJobDetails[0].resumePath) {
        setImageText(true);
      } else {
        setImageText(false);
      }
      const resetObject = {
        firstName: response3.data.data.firstName,
        lastName: response3.data.data.lastName,
        email: response3.data.data.email,
        phoneNumber: response3.data.data.phoneNumber,
        address: response3.data.data.address,
        industryId: response3.data.data.userJobDetails[0].industryId,
        employmentTypeId:
          response3.data.data.userJobDetails[0].employmentTypeId,
        description: response3.data.data.userJobDetails[0].description,
        recentJobTitle: response3.data.data.userJobDetails[0].recentJobTitle,
        school: response3.data.data.userEducations[0].school,
        degree: response3.data.data.userEducations[0].degree,
        studyField: response3.data.data.userEducations[0].studyField,
        startDate: moment(
          response3.data.data.userEducations[0].startDate
        ).format("yyyy-MM-DD"),
        endDate: moment(response3.data.data.userEducations[0].endDate).format(
          "yyyy-MM-DD"
        ),
        description1: response3.data.data.userEducations[0].description,
      };
      reset(resetObject);
      setloader(false);
    })();
  }, []); //eslint-disable-line

  const changeInput = (e) => {
    debugger;
    const final = e.map((item) => {
      return { skillId: item.value, skillsTitle: item.label };
    });
    setFinalSkillData(final);
  };

  return (
    <>
      <Link to="/pilot">
        <div className="main_heading-section1">
          <div className="icon_back_box">
            <img src="/assets/images/icon_back.svg" alt="" />
          </div>
          <h1 className="main_heading">Pilots Detail</h1>
        </div>
      </Link>
      <div className="dashboard_stats_card g40">
        <div className="image_upload_card">
          {loader ? (
            <div className="loader loader_color loader_size"></div>
          ) : (
            <>
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
                    debugger;
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
            </>
          )}
        </div>
        <div className="section_card w60 card_padding_section">
          {loader ? (
            <div className="loader_section">
              <div className="loader loader_color loader_size"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(Submit)}>
              <h1 className="main_heading fs30 mb30">Personal Details</h1>

              <div className="row">
                <div className="col-md-6 mb20">
                  <label className="input_label">First Name</label>
                  <input
                    className="inputField mxWidth100"
                    placeholder="Your Name"
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName?.type === "required" && (
                    <p className="error_validation">First name is required</p>
                  )}
                </div>
                <div className="col-md-6 mb20">
                  <label className="input_label">Last Name</label>
                  <input
                    className="inputField mxWidth100 "
                    placeholder="Your Name"
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
                    className="inputField mxWidth100 "
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
                    className="inputField mxWidth100 "
                    placeholder="jds@gmail.com"
                    {...register("email", { required: true })}
                  />
                  {errors.email?.type === "required" && (
                    <p className="error_validation">Email is required</p>
                  )}
                </div>

                <div className="col-md-6 mb20">
                  <label className="input_label">Enter Your Address</label>
                  <input
                    type="text"
                    className="inputField mxWidth100 "
                    placeholder="Location"
                    {...register("address", { required: true })}
                  />
                  {errors.address?.type === "required" && (
                    <p className="error_validation">Address is required</p>
                  )}
                </div>
                <h1 className="main_heading fs30 mb30">Update Password</h1>
                <div className="col-md-6 mb20">
                  <label className="input_label">New Password</label>
                  <input
                    type="password"
                    className="inputField mxWidth100"
                    placeholder="*********"
                    {...register("password")}
                  />
                  {passwordValidation ? (
                    <p className="error_validation">Password Not Matching</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 mb20">
                  <label className="input_label">Confirm Password</label>
                  <input
                    type="password"
                    className="inputField mxWidth100"
                    placeholder="*********"
                    {...register("confirmPassword")}
                  />
                  {passwordValidation ? (
                    <p className="error_validation">Password Not Matching</p>
                  ) : (
                    ""
                  )}
                </div>
                <h1 className="main_heading fs30 mb30 pt10">Job Details</h1>

                <div className="col-md-6 mb20">
                  <label className="input_label">Industry</label>
                  <select
                    className="inputField mxWidth100 "
                    {...register("industryId", { required: true })}
                  >
                    <option selected value="0">
                      Select
                    </option>
                    {industry?.map((item) => {
                      return (
                        <>
                          <option value={item.id}>{item.title}</option>
                        </>
                      );
                    })}
                  </select>
                  {validationErrors.industryError ? (
                    <p className="error_validation">Industry is required</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 mb20">
                  <label className="input_label">Employment Type</label>
                  <select
                    className="inputField mxWidth100 "
                    {...register("employmentTypeId", { required: true })}
                  >
                    <option selected value="0">
                      Select
                    </option>
                    {employee?.map((item) => {
                      return (
                        <>
                          <option value={item.id}>{item.title}</option>
                        </>
                      );
                    })}
                  </select>
                  {validationErrors.employeeError ? (
                    <p className="error_validation">
                      EmploymentType is required
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 mb20">
                  <label className="input_label">Recent Job Title</label>
                  <input
                    type="text"
                    className="inputField mxWidth100 "
                    placeholder="Recent Job Title"
                    {...register("recentJobTitle", { required: true })}
                  />
                  {errors.recentJobTitle?.type === "required" && (
                    <p className="error_validation">
                      RecentJobTitle is required
                    </p>
                  )}
                </div>
                <div className="col-md-6 mb20">
                  <label className="input_label">Skills</label>
                  <Select
                    isMulti
                    name="colors"
                    options={
                      skill?.length === 0
                        ? [
                            {
                              value: "",
                              label: "Loading...",
                            },
                          ]
                        : skill?.map((item) => {
                            return {
                              value: item.skillId,
                              label: item.title,
                            };
                          })
                    }
                    value={finalSkillData?.map(function (item) {
                      return {
                        value: item.skillId,
                        label: item.skillsTitle,
                      };
                    })}
                    isSearchable
                    required
                    onChange={(option) => changeInput(option)}
                    className="mxWidth100  multiselect"
                    classNamePrefix="select"
                  />
                </div>
                <div className="col-md-6 mb20">
                  <label className="input_label" htmlFor="inputResume">
                    Add Resume
                    <div className="inputField  resume_contains">
                      <h4 className="resume_text">
                        {imageText ? (
                          <>
                            <div
                              className="resume_text"
                              style={{ color: "green" }}
                            >
                              Resume Added
                            </div>
                          </>
                        ) : (
                          "Add Resume"
                        )}
                      </h4>
                      <img
                        src="/assets/images/Icon metro-cross.png"
                        style={{ paddingLeft: "50%" }}
                        alt=""
                      />
                      <input
                        id="inputResume"
                        name="inputResume"
                        type="file"
                        className="resume_input"
                        placeholder="Add Resume"
                        onChange={(e) => {
                          debugger;
                          setUploadImage1(e.target.files[0]);
                          setImageText(true);
                          uploader1(e);
                        }}
                      />
                      {validationErrors.uploadImageSecondError ? (
                        <p className="error_validation">Image is Required</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </label>
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

                <h1 className="main_heading fs30 mb30 pt10">
                  Education Details
                </h1>

                <div className="col-md-6 mb20">
                  <label className="input_label">School</label>
                  <input
                    type="text"
                    className="inputField mxWidth100 "
                    placeholder="School"
                    {...register("school", { required: true })}
                  />
                  {errors.school?.type === "required" && (
                    <p className="error_validation">School is required</p>
                  )}
                </div>
                <div className="col-md-6 mb20">
                  <label className="input_label">Degree</label>
                  <input
                    type="text"
                    className="inputField mxWidth100 "
                    placeholder="Degree"
                    {...register("degree", { required: true })}
                  />
                  {errors.degree?.type === "required" && (
                    <p className="error_validation">Degree is required</p>
                  )}
                </div>
                <div className="col-md-6 mb20">
                  <label className="input_label">Your Field of Study</label>
                  <input
                    type="text"
                    className="inputField mxWidth100 "
                    placeholder="Your Field of Study"
                    {...register("studyField", { required: true })}
                  />
                  {errors.studyField?.type === "required" && (
                    <p className="error_validation">Study field is required</p>
                  )}
                </div>
                <div className="col-md-6 mb20">
                  <label className="input_label">Start Date</label>
                  <input
                    type="date"
                    className="inputField mxWidth100  pr20"
                    placeholder="Start Date"
                    {...register("startDate", {
                      required: true,
                    })}
                  />
                  {errors.startDate?.type === "required" && (
                    <p className="error_validation">Start date is required</p>
                  )}
                </div>
                <div className="col-md-6 mb20">
                  <label className="input_label">End Date</label>
                  <input
                    type="date"
                    className="inputField mxWidth100  pr20"
                    placeholder="End Date"
                    {...register("endDate", { required: true })}
                  />
                  {errors.endDate?.type === "required" && (
                    <p className="error_validation">End date is required</p>
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
                  <Link to="/pilot">
                    <button className="cancel_button">Cancel</button>
                  </Link>
                  <button type="submit" className="save_button">
                    {btnLock ? (
                      <div
                        className="loader loader_color"
                        style={{ margin: "0 20px" }}
                      ></div>
                    ) : (
                      "Update"
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default EditPilot;
