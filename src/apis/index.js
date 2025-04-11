import axiosConfig from "@/utils/axiosConfig.js";

const API = {
  login: async(payload) => axiosConfig.get("/userData", payload),
  getUserAllData: async(payload) => axiosConfig.get("/userAllData", payload),
};
export default API;
