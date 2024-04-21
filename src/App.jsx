import React from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./user/User";
import { UserProvider } from "./user/UserContext";
import AdminDash from "./admin/AdminDash";
import AdminLogin from "./admin/AdminLogin";

const App = () => {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/admin/dash" element={<AdminDash />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
};

export default App;
