import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "./components/login/AdminLogin";
import Home from "./components/Home/Home";
import { ToastContainer } from "react-toastify";
import Header from "./components/layouts/Header";
import UserHome from "./components/user/UserHome";
import NewsDetail from "./components/user/NewsDetail";
import Video from "./components/video/Video";

const MainRoute = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/newsdetails/:newsId" element={<NewsDetail />} />

        <Route path="/video" element={<Video/>} />

      </Routes>
    </>
  );
};

export default MainRoute;
