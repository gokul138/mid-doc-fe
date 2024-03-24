import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Pricing from "./Pricing";
import Login from "./Login";
import Forgotpassword from "./Forgotpassword";

const Route00 = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/pricing/" element={<Pricing />} />
          <Route path="/main/" element={<Home />} />
          <Route path="/signup/" element={<Login />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/password/" element={<Forgotpassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Route00;
