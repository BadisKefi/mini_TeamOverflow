import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { createUser, getUserByUsername } from './api';
import { Link } from 'react-router-dom';

function Signin() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const usenavigate = useNavigate();

    const apiPostUser = async (userData) => {
        try {
            const response = await createUser(userData);
            alert(response);
        } catch (error) {
            console.log(`Error creating user`, error);
            return null;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === password2) {
            const userDataForCreate = {
                username,
                password
            };
            try {
                await apiPostUser(userDataForCreate);
                usenavigate('/');
            } catch (error) {
                alert("erreur creating user!");
            }
        }
        else {
            alert("passwords should match!");
        }
    };
    return (
        <div class="container my-5">
            <div class="row">
                <div class="col-lg-3">

                </div>
                <div class="col-lg-6">
                    <h2 className="fs-2 fw-medium font-monospace"><i class="bi bi-person-lines-fill"></i><span className="mx-3">Sign In</span></h2>
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
                        <div className="mb-3">
                            <label htmlFor="password2" className="form-label fw-medium font-monospace">
                                Repeat Password:
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password2"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary fw-medium font-monospace me-2  mb-2">
                            <i class="bi bi-box-arrow-in-right me-2"></i>Sign in
                        </button>
                        <Link to="/" className="btn btn-secondary">
                        <i class="bi bi-person-lines-fill me-2"></i>return to log in ?
                        </Link>
                    </form>
                </div>
            </div>
            <div class="col-lg-3">
            </div>
        </div>
    );
}
export default Signin;