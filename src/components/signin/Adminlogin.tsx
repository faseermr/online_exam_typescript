import React from "react";
import { Formik } from "formik";
import studentServices from "../../service/studentServices";
import { useNavigate } from "react-router-dom";
import adminServices from "../../service/adminServices";
import "./style1.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="login">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(data) => {
          adminServices
            .adminLogin({
              email: data.email,
              password: data.password,
            })
            .then((res) => {
              if (res.data.error) {
                alert(res.data.error);
              } else {
                alert(res.data.message);
                console.log(res.data);
                localStorage.setItem("admin", JSON.stringify(res.data));
                navigate(`/dashboard`);
                window.location.reload();
              }
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="login-form">
            <h1 className="login-heading">Admin Login</h1>
            <label className="login-label">Username</label>

            <input
              name="email"
              type="email"
              className="signin-input"
              onChange={handleChange}
            />

            <label className="login-label">Password</label>

            <input
              name="password"
              type="password"
              className="signin-input"
              onChange={handleChange}
            />

            <button type="submit" className="signin-submit">
              Login
            </button>
            <a>Forgot Password?</a>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AdminLogin;
