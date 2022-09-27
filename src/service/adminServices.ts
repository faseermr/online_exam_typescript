import http from "../http.common";

const adminLogin = (data: any) => {
  return http.post(`/admin`, data);
};

export default {
  adminLogin,
};
