import React from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function Navbar({ user, setUser }) {

  const usenavigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(null)
    usenavigate('/')
  };
  return (
    <>
      <div className="container-fluid">
        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="container">
            <Link to="/" className="navbar-brand">Team Ice</Link>
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <Link to="/posts" className="nav-link">all posts</Link>
              </li>
            </ul>
            <span class="navbar-text mx-3">welcome back {user.username}</span>

            <form onSubmit={handleSubmit}>
              <button type="submit" className="btn btn-primary">Log out</button>
            </form>
          </div>
        </nav>
      </div>
    </>
  );
}
export default Navbar;