import axiosConfig from "@/utils/axiosConfig.js";

const API = {
  login: async (payload) => axiosConfig.get("/userData", payload),
  getCardOption: async () => axiosConfig.get("/cardType"),
  fetchCardOption: async (payload) => axiosConfig.post("/cardType",payload),
editCardOption: async (payload) => axiosConfig.post("/cardType",payload),

  getLanguageOption: async () => axiosConfig.get("/languageType"),
  getIidentificationOption: async () => axiosConfig.get("/identificationType"),
  getUserAllData: async (payload) => axiosConfig.get("/userAllData", payload),
};
export default API;
