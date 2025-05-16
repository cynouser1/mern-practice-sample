import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import SignUp from "../pages/auth/SignUp";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
