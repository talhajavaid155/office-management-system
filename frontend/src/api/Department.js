import axios from "axios";

export const DepartmentApi = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
