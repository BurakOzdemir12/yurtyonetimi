import React from "react";
import ReactDOM from "react-dom/client";
import App from "./root/App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RoutesConfig from "./root/RoutesConfig";
import { jwtDecode } from "jwt-decode";
import DormReview from "./Pages/dormReview/DormReview";
import Cookies from "universal-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));
// const isTopbarVisible = window.location.pathname !== "/DormReview"||"/login"; // Determine if Topbar should be visible
const isTopbarVisible =
  window.location.pathname !== "/DormReview" &&
  window.location.pathname !== "/login";
const cookies =new Cookies()
const userToken = cookies.get("jwt_auth");
const data = userToken ? jwtDecode(userToken) : null;
const isAdmin = data ? data.isAdmin : false;
const isAuthenticated = data ? true : false;
const isnotGuest = isAuthenticated;
root.render(

  <BrowserRouter>
  <Routes>
  {isAdmin ? (
          <Route path="/*" element={<RoutesConfig />} />
        ) : (
          <Route path="/*" element={<App />} />
        )}
         <Route path="*" element={<Navigate to="/" />} />
  </Routes>
  
  
  {/* {isAuthenticated && isAdmin  ? <RoutesConfig /> :<App/> } */}
  </BrowserRouter>
);

reportWebVitals();
