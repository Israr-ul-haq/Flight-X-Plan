import axios from "../constants/AxiosConfig";

// export const get = async (body) => {
//   try {
//     const response = await axios.get(
//       `api/admin/Pilot/GetAllPilots?PageNumber=${body.pageNumber}&PageSize=${body.pageSize}`
//     );
//     return response;
//   } catch (error) {
//     return error.response;
//   }
// };
export const get = async (body) => {
  const config = {
    headers: {
      api_key: "X5Ne0km7852Q1ykny9FfcCV2IK5y9kVV5v6",
      api_secret: "Q1X5NeknKR3kyV5v6Vkm78y9FfcI0K5y952",
    },
  };
  try {
    debugger;
    const response = await axios.post(
      `/bss_web/index.php/bss_reg/get_cities`,
      body,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getById = async (id) => {
  try {
    const response = await axios.get(`api/admin/pilot/GetPilotById/${id}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteSomething = async (body) => {
  try {
    const response = await axios.patch(
      "api/admin/pilot/DeletePilot?id=" + body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const save = async (body) => {
  try {
    const response = await axios.post("api/admin/pilot/SavePilot", body);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const update = async (body) => {
  try {
    const response = await axios.put("api/admin/pilot/UpdatePilot", body);
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

export const getLookupsIndustry = async (body) => {
  try {
    const response = await axios.get(`api/admin/Lookups/GetAllIndustries`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getLookupsEmployType = async (body) => {
  try {
    const response = await axios.get(`api/admin/Lookups/GetAllEmploymentTypes`);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const getLookupSkills = async (body) => {
  try {
    const response = await axios.get(`api/admin/Lookups/GetAllSkills`);
    return response;
  } catch (error) {
    return error.response;
  }
};
