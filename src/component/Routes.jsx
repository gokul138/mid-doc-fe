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

const Route00 = () => {
  const [showLoader, setShowLoader] = useState(true);

  // Function to hide the loader after 2 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 1500);

    // Clean up the timeout on component unmount or when the flag is set to false
    return () => clearTimeout(timeout);
  }, []);

  const showNewTabLoader = (show) => {
    setShowLoader(show);
  };

  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          {/* Conditionally render the loader */}
          {showLoader && <NewTabLoader />}
          <Routes>
            <Route path="/" element={<Login showLoader={showNewTabLoader} />} />
            <Route path="/signup" element={<SignUp showLoader={showNewTabLoader} />} />
            <Route path="/forgot-password" element={<Forgotpassword showLoader={showNewTabLoader} />} />
            <Route path="/pricing" element={<Pricing showLoader={showNewTabLoader} />} />
            <Route path="/main" element={<Home showLoader={showNewTabLoader} />} />
            <Route path="/payment-failed" element={<PaymentFail showLoader={showNewTabLoader} />} />
            <Route path="/payment-success" element={<PaymentSuccess showLoader={showNewTabLoader} />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
};

export default Route00;
