
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import { toast } from "react-toastify";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { loginUser } = useUser();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/dashboard/login",
        loginData
      );
      console.log(response.data.email);
      //   Admin@123

      if (
        response.status === 200 &&
        response.data.email === "admin@email.com"
      ) {
        toast.error("Try the email in Admin Login!!");

        setTimeout(() => {
          navigate("/admin/login");
        }, 1000);
      } else {
        loginUser(response.data);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/user");
        }, 1000);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="mb-4 text-center">Login</h1>
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-3">
                  <label htmlFor="loginEmail" className="form-label">
                    Email
                  </label>{" "}
                  <br />
                  <input
                    type="text"
                    name="email"
                    id="loginEmail"
                    className="form-control"
                    onChange={handleLoginChange}
                    value={loginData.email}
                  />{" "}
                  <br />
                </div>
                <div className="mb-3">
                  <label htmlFor="loginPassword" className="form-label">
                    Password
                  </label>{" "}
                  <br />
                  <input
                    type="password"
                    name="password"
                    id="loginPassword"
                    className="form-control"
                    onChange={handleLoginChange}
                    value={loginData.password}
                  />{" "}
                  <br />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
              <p className="mt-2">
               Create a new Account? <Link to='/'>Signup</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
