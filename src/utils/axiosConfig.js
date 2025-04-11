import axios from "axios";

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_API_AXIOS_BASE_URL,
  timeout: 6000,
  headers: {
    accept: "text/plain",
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use(async (config) => {
  return config;
});

// async function updateToken() {
//     console.log('更新JWT');
//     return {
//         JWT: 'jwt'
//     };
// }

// 設置請求攔截器。這個攔截器在發送請求之前執行
// let jwtToken = '';
// axiosConfig.interceptors.request.use(async (config) => {
//     console.log(config);
//     config.data = JSON.stringify(config.data);
//     if (!jwtToken) {
//         const { JWT } = await updateToken(false);
//         jwtToken = JWT;
//     }
//     config.headers.Authorization = `Bearer ${jwtToken}`;
//     return config;
// });

// 設置響應攔截器。這個攔截器在收到響應後執行，您可以在這裡處理響應數據或錯誤
axiosConfig.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.request?.status !== 401) {
      return console.log("錯誤");
    }
    return Promise.reject(err.response);
  }
);

export default axiosConfig;
