import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzNhM2RjZGFkOGUyYjBlZGJiMjAwZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5Nzk1NzQ3MSwiZXhwIjoxNjk4MjE2NjcxfQ.Zw-5EVpVkiU_H9DIMiWDngUppx-AJrQQ6bAkvfIdoPo"


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});