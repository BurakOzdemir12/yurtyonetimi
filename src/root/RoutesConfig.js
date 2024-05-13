import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
// Admin Page
import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";
import Dashboard from "../scenes/dashboard/Index";
import Students from "../scenes/students/Students";
import Comments from "../scenes/comments/Comments";
import Reservations from "../scenes/reservations/Reservations";
import Form from "../scenes/form/Form";
// import Room2 from "../scenes/room/Room2";
import Room from "../scenes/room/Room";
import Bar from "../scenes/bar/Bar";
// import Line from "../scenes/line";
import Pie from "../scenes/pie/Pie";
import DormProps from "../scenes/dormProps/DormProps";
import UpdateForm from "../scenes/form/UpdateForm";
import Login from "../scenes/login/Login";
import DormReview from "../Pages/dormReview/DormReview";
// import Geography from "../scenes/geography";
// import Calendar from "../scenes/calendar";
const isNavigatingToLoginPage = window.location.pathname === "/login";

const RoutesConfig = () => {
  const navigate = useNavigate();
  if (isNavigatingToLoginPage) {
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/")
  }
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          <Sidebar isSidebar={isSidebar} />

          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />

            <Routes>
              {/* <Route path="/login" element={<Login />} /> */}

              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/dormprops" element={<DormProps />} />
              <Route path="/form" element={<Form />} />
              <Route path="/updateStudent/:id" element={<UpdateForm />} />

              <Route path="/room" element={<Room />} />
              <Route path="/comments" element={<Comments />} />
              <Route path="/statistics" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/reservations" element={<Reservations />} />
              {/* <Route path="/invoices" element={<Invoices/>}/> */}
              {/* <Route path="/room2" element={<Room2/>}/> */}

              {/* <Route path="/faq" element={<FAQ/>}/> */}
              {/* <Route path="/geography" element={<Geography/>}/> */}
              {/* <Route path="/calendar" element={<Calendar/>}/> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default RoutesConfig;

// <BrowserRouter>
//         <Routes>
//           <Route path="/" />
//           <Route element={<Navi />}>
//             <Route index path="/DormReview" Component={DormReview} />
//           </Route>
//           {/* <Route path="/Dorms" Component={Dorms}/> */}
//             <Route index path="/AdminMain" Component={AdminMain} />
//           <Route path="/Test" Component={Test} />
//         </Routes>
//       </BrowserRouter>
