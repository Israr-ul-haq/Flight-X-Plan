import axios from "../constants/AxiosConfig";

export const get = async (body) => {
  try {
    const response = await axios.get(
      `api/admin/Job/GetAllJobs?PageNumber=${body.pageNumber}&PageSize=${body.pageSize}`
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getById = async (id) => {
  try {
    const response = await axios.get(`api/admin/Job/GetJobById/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const deleteSomething = async (body) => {
  try {
    const response = await axios.delete("/api/Admin/DeleteUser/" + body);
    return response;
  } catch (error) {
    return error.response;
  }
};
