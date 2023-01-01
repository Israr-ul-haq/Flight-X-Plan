import axios from "../constants/AxiosConfig";

export const get = async (body) => {
  try {
    const response = await axios.get(
      `api/admin/Recruiter/GetAllRecruiters?PageNumber=${body.pageNumber}&PageSize=${body.pageSize}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getById = async (id) => {
  try {
    const response = await axios.get(
      `api/admin/recruiter/GetRecruiterById/${id}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteSomething = async (body) => {
  try {
    const response = await axios.patch(
      "api/admin/recruiter/DeleteRecruiter?id=" + body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const save = async (body) => {
  try {
    const response = await axios.post(
      "api/admin/recruiter/SaveRecruiter",
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const update = async (body) => {
  try {
    const response = await axios.put(
      "api/admin/recruiter/UpdateRecruiter",
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const uploadImage = async (body) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  try {
    const response = await axios.post(
      `api/admin/recruiter/UploadPhoto`,
      body,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
