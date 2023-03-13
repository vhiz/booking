import axios from "axios";

export const makeRequest = axios.create({
    baseURL: "https://bookingapi-jr8w.onrender.com/api/",
    withCredentials: true
})