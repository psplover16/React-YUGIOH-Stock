import axiosConfig from "@/utils/axiosConfig.js";

async function login(payload) {
    return await axiosConfig.post("/api/auth/login", payload);
}




export {
    login
}