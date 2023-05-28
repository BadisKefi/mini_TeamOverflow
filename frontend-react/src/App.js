import Login from './components/Login';
import Posts from './components/Posts';
import Comments from './components/Comments';
import PostForm from './components/PostForm';
import CommentForm from './components/CommentForm';
import Navbar from './components/Navbar';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './components/signin';

function App() {

  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem('user')));
    console.log("effect 1");
  },[]);

  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(user));
    console.log("effect 2");
  },[user]);
  return (
    <>
      <Router>
        {user && <Navbar setUser={setUser} user={user} />}
        <Routes>
          <Route path="/signin" element={user ? <Navigate to="/posts" /> : <Signin/>} />
          <Route path="/" element={user ? <Navigate to="/posts" /> : <Login setUser={setUser} user={user} />} />
          <Route path="/posts" element={user ? <Posts user={user} /> : <Navigate to="/" />} />
          <Route path="/postform" element={user ? <PostForm user={user} /> : <Navigate to="/" />} />
          <Route path="/postform/:id" element={<PostForm user={user} />} />
          <Route path="/comments/:id" element={<Comments user={user} />} />
          <Route path="/commentform/:id_post/:id_comment" element={<CommentForm user={user} />} />
          <Route path="/commentform/:id_post" element={<CommentForm user={user} />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;