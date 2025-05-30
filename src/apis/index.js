import axiosConfig from "@/utils/axiosConfig.js";

const API = {
  login: async (payload) => axiosConfig.get("/userData", payload),
  // 
  getCardOption: async () => axiosConfig.get("/cardType"),
  fetchCardOption: async (payload) => axiosConfig.post("/cardType", payload),
  editCardOption: async (payload) =>
    axiosConfig.put(`/cardType/${payload.id}`, payload),
  // 
  getLanguageOption: async () => axiosConfig.get("/languageType"),
  fetchLanguageOption: async (payload) => axiosConfig.post("/languageType", payload),
  editLanguageOption: async (payload) =>
    axiosConfig.put(`/languageType/${payload.id}`, payload),
  // 
  getIidentificationOption: async () => axiosConfig.get("/identificationType"),
  getUserAllData: async (payload) => axiosConfig.get("/userAllData", payload),
};
export default API;
