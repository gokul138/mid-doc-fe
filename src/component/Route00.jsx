import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Pricing from "./Pricing";

const Route00 = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/pricing/" element={<Pricing />} />
          <Route path="/main/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Route00;
