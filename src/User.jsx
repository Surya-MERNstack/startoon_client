// User.js
import React, { useState } from "react";
import { useUser } from "./UserContext";

const User = () => {
  const { user } = useUser();
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="mb-4 text-center">User Info</h1>
              {user ? (
                <>
                  <p>Name: {user.username}</p>
                  <p>Email: {user.email}</p>
                  {/* Add more user information as needed */}
                </>
              ) : (
                <p>No user logged in</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
