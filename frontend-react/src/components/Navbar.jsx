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
      <div className="">
        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="container">
            <Link to="/" className="navbar-brand"><i class="bi bi-cup-hot me-2"></i>Team Overflow</Link>
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <Link to="/posts" className="nav-link"><i class="bi bi-chat-left-text-fill me-2"></i>all posts</Link>
              </li>
            </ul>
            <span class="navbar-text mx-2">welcome back <i class="bi bi-person-circle"></i> {user.username}</span>

            <form onSubmit={handleSubmit}>
              <button type="submit" className="btn btn-primary mx-2">Log out<i class="bi bi-box-arrow-right ms-2"></i></button>
            </form>
          </div>
        </nav>
      </div>
    </>
  );
}
export default Navbar;