import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Pricing from "./Pricing";
import Login from "./Login";
import Forgotpassword from "./Forgotpassword";
import SignUp from "./Signup";
import PaymentFail from "./PaymentFail";
import PaymentSuccess from "./PaymentSuccess";
import { UserProvider } from "./helpers/UserContext";
import NewTabLoader from "./helpers/NewTabLoader";
import ConfirmMail from "./ConfirmMail";
import SelectInteraction from "./SelectInteraction";
import DocgenieeHome from "./DocgenieeHome";
import Chatgeniee from "./Chatgeniee";

const Route00 = () => {
  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<Forgotpassword />} />
            <Route path="/confirm-mail" element={<ConfirmMail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/main" element={<Home />} />
            <Route path="/payment-failed" element={<PaymentFail />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/home" element={<SelectInteraction />} />
            <Route path="/docgeniee" element={<DocgenieeHome />} />
            <Route path="/chatgeniee" element={<Chatgeniee />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
};

export default Route00;
