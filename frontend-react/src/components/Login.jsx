import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getAllUsers } from './api';

function Login({user, setUser}) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const usenavigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        let foundUser = null;
        const users = await getAllUsers();
        users.map((user) => {
          if (user.username == username && user.password == password) {
            foundUser = user;
          }
        });
        console.log(foundUser && foundUser.username);

        if (foundUser) {
          setUser(foundUser);
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
    <>
    <div className="container mt-4">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            User Name :
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
          <label htmlFor="password" className="form-label">
            User Password :
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      </div>
    </>
  );
}
export default Login;