import axios from "axios";

export const DesignationApi = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
