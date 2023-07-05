import axios from "axios";

export const makeRequest = axios.create({
    baseURL:"http://localhost:8800/api/",
    withCredentials: true,
});

export const makeRequestGoogle = axios.create({
    baseURL:"https://maps.googleapis.com/maps/api",
    withCredentials: true,
});