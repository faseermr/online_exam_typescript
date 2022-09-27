import http from "../http.common";

const studentLogin = (data: any) => {
  return http.post(`/login`, data);
};

const studentSignup = (data: any) => {
  return http.post("/login/signup", data);
};

export default {
  studentLogin,
  studentSignup,
};
