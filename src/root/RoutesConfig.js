import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DormReview from "../Pages/dormReview/DormReview";
import Navi from "../Components/nav/Navi";
import AdminMain from "../Pages/adminMain/AdminMain";
import Test from "../Pages/phptest/Test";
// Admin Page
import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";
import Dashboard from "../scenes/dashboard/Index";
import Students from "../scenes/students/Students";
// import Invoices from "../scenes/invoices";
// import Contacts from "../scenes/contacts";
// import Bar from "../scenes/bar";
import Form from "../scenes/form/Form";
// import Line from "../scenes/line";
// import Pie from "../scenes/pie";
// import FAQ from "../scenes/line/faq";
// import Geography from "../scenes/geography";
// import Calendar from "../scenes/calendar";

const RoutesConfig = () => {
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
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students/>}/>
              {/* <Route path="/contacts" element={<Contacts/>}/> */}
              {/* <Route path="/invoices" element={<Invoices/>}/> */}
              {/* <Route path="/bar" element={<Bar/>}/> */}
              <Route path="/form" element={<Form/>}/>
              {/* <Route path="/line" element={<Line/>}/> */}
              {/* <Route path="/pie" element={<Pie/>}/> */}
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