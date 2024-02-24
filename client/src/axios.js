import axios from "axios";

export const makeRequest = axios.create({
    baseURL:"https://192.168.56.1:3001/api/",
    withCredentials: true,
});

export const makeRequestGoogle = axios.create({
    baseURL:"https://maps.googleapis.com/maps/api",
    withCredentials: true,
});