import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  // SERVER_URL "http://localhost:5000/dashboard/signup"

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
       import.meta.env.VITE_SERVER_URL + "/dashboard/signup",
        signupData
      );
      console.log(response.status);

      if (response.status === 200) {
        toast.success(response.data.message)
        setTimeout(() => {
          navigate("/user/login");
        },1000);
      } 
      
      if (response.status === 500) {
       
        toast.error(response.data.message);
      }
    } catch (error) {
        
     toast.error("Something went wrong")
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="mb-4 text-center">Signup</h1>
              <form onSubmit={handleSignupSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="form-control"
                    onChange={handleSignupChange}
                    value={signupData.username}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                    onChange={handleSignupChange}
                    value={signupData.email}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    onChange={handleSignupChange}
                    value={signupData.password}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Gender</label>
                  <div className="d-flex justify-content-around">
                    <div className="form-check">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        className="form-check-input"
                        onChange={handleSignupChange}
                        checked={signupData.gender === "male"}
                      />
                      <label className="form-check-label">Male</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        className="form-check-input"
                        onChange={handleSignupChange}
                        checked={signupData.gender === "female"}
                      />
                      <label className="form-check-label">Female</label>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Signup
                </button>
                <p className="d-flex justify-content-around mt-2">
                  <Link to="admin/login">Admin Login</Link>
                 <span>Already have an account? <Link to= "/user/login">User Login</Link> </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
