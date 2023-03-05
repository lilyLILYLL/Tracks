import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const api = axios.create({
    baseURL: "https://adbc-202-169-121-220.au.ngrok.io",
    headers: {
        Authorization: "Bearer",
    },
});

api.interceptors.request.use(
    // authorize ourself
    async (config) => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.log("There is no token");
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);
export default api;
