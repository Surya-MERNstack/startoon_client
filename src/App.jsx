import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./User";
import { UserProvider } from "./UserContext";
import AdminPage from "./AdminPage";
import AdminDash from "./AdminDash";
import AdminLogin from "./AdminLogin";


const App = () => {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/admin/page" element={<AdminPage />} />
            <Route path="/admin/dash" element={<AdminDash />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
      
    </>
  );
};

export default App;
