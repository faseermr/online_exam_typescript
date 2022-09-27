import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import Signin from "./components/signin/Signin";
import AdminLogin from "./components/signin/Adminlogin";
import Signup from "./components/signup/Signup";
import UserContextProvider from "./context/userContext";
import "./App.css";
import Classroom from "./components/class/Classroom";
import Navbar from "./container/Navbar";
import Layout from "./container/Layout";

function App() {
  return (
    <UserContextProvider>
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navbar />
          </div>
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminLogin />} />
          </Routes>
          <Layout />
        </BrowserRouter>
        {/* <Classroom /> */}
      </Provider>
    </UserContextProvider>
  );
}

export default App;
