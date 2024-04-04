import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Pricing from "./Pricing";
import Login from "./Login";
import Forgotpassword from "./Forgotpassword";
import SignUp from "./Signup";

const Route00 = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/forgot-password" element={<Forgotpassword />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/main" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Route00;
