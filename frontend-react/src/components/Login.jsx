import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getUserByUsername } from './api';

function Login({ user, setUser }) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const usenavigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await getUserByUsername(username);
      if (user.username == username && user.password == password) {
        setUser(user);
        usenavigate('/posts');
      }
      else {
        alert('Please enter a valid informations');
      }
    } catch (error) {
      alert('Cannot perform the action due to an error');
    }
  };
  return (
      <div class="container my-5">
        <div class="row">
          <div class="col-3">
          </div>
          <div class="col-6">
            <h2 className="fs-2 fw-medium font-monospace"><i class="bi bi-person-lines-fill"></i><span className="mx-3">Login</span></h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-medium font-monospace">
                  User Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-medium font-monospace">
                  User Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary fw-medium font-monospace">
                <i class="bi bi-box-arrow-in-right me-2"></i>Login
              </button>
            </form>
          </div>
        </div>
        <div class="col-3">

        </div>
      </div>
  );
}
export default Login;