import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostWithUserById, createPost, updatePost } from './api';

const PostForm = ({ user }) => {

  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      apiPost();
    }
  }, [id]);

  const apiPost = async () => {
    try {
      const foundPost = await getPostWithUserById(id);
      setTitle(foundPost.title);
      setBody(foundPost.body);
    } catch (error) {
      alert('Cannot perform the action due to an error');
    }
  }
  const apiPutPost = async (postData) => {
    try {
      const response = await updatePost(id, postData);
    } catch (error) {
        console.log(`Error updating post with ID ${id}:`, error);
        return null;
    }
  }
  const apiPostPost = async (postData) => {
    try {
      const response = await createPost(postData);
    } catch (error) {
        console.log(`Error creating post with ID ${id}:`, error);
        return null;
    }
  }
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const postDataForUpdate = {
        title,
        body,
      };
      try {
        await apiPutPost(postDataForUpdate);
        navigate('/posts');
      } catch (error) {
        console.log(`Error updating post with ID ${id}:`, error);
      }
    } else {
      const postDataForCreate = {
        title,
        body,
        user_id: user.id,
      };
      try {
        await apiPostPost(postDataForCreate);
        navigate('/posts');
      } catch (error) {
        console.log(`Error creating post with ID ${id}:`, error);
      }
    }
  };
  return (
    <div className='container'>
      {isEditing ? <h2>Edit Post</h2> : <h2>Create Post</h2>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            Body
          </label>
          <textarea
            className="form-control"
            id="body"
            rows="5"
            value={body}
            onChange={handleBodyChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Update' : 'Create'}
        </button>
        <div className="alert">will be {isEditing ? 'updated' : 'created'} by : {user.username}</div>
      </form>
    </div>
  );
};

export default PostForm;
