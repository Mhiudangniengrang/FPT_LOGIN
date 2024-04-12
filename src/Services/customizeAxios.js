import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080",
    // baseURL: "https://meetmylecture-production.up.railway.app",
});

// Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent 
        const accessToken = typeof window !== undefined ? localStorage.getItem("accessToken") : null;


        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        // Add other headers if needed
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lies within the range of 2xx causes this function to trigger
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Any status codes that fall outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

export default instance;
