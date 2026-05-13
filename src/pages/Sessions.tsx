import axios from "axios";

const api = axios.create({
    baseURL: "localhost:3000"
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if (token) {
        config.headers.setAuthorization(`bearer ${token}`)
    } 

    return config
})

api.interceptors.response.use((response) => response, (error) => {
    if(error.response?.status == 401) {
        localStorage.removeItem("token")
        window.location.href = "/login"
    }
    return Promise.reject(error)
})

export default api