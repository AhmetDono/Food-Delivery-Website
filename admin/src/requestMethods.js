import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
 //const TOKEN =
   //JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
     //.accessToken || "";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzRjZmY4MzNmZTk4NDY4MTMyYzMyNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5OTQ0NTkxMSwiZXhwIjoxNjk5NzA1MTExfQ.BToEKXxEAbqD0RCZX6uDWn_wq3Cd05vPTb_PQS0TnsI"


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});