import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCommentWithUserAndWithPostById, createComment, updateComment, getPostWithUserById } from './api';

const CommentForm = ({ user }) => {

  const { id_comment } = useParams();
  const { id_post } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [post, setPost] = useState();

  const navigate = useNavigate();

  const [body, setBody] = useState('');

  useEffect(() => {
    if (id_comment) {
      setIsEditing(true);
      apiPost();
      apiComment();
    }
  }, []);
  const apiPost = async () => {
    try {
      const foundPost = await getPostWithUserById(id_post);
      setPost(foundPost);
    } catch (error) {
      alert('Cannot perform the action due to an error');
    }
  }
  const apiComment = async () => {
    try {
      const foundComment = await getCommentWithUserAndWithPostById(id_comment);
      setBody(foundComment.body);
    } catch (error) {
      alert('Cannot perform the action due to an error');
    }
  }

  const apiPutComment = async (commentData) => {
    try {
      const response = await updateComment(id_comment, commentData);
    } catch (error) {
        console.log(`Error updating comment with ID ${id_comment}:`, error);
        return null;
    }
  }
  const apiPostComment = async (commentData) => {
    try {
      const response = await createComment(commentData);
    } catch (error) {
        console.log(`Error creating comment:`, error);
        return null;
    }
  }

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const commentDataForUpdate = {
        body
      };
      try {
        await apiPutComment(commentDataForUpdate);
        navigate(`/comments/${id_post}`);
      } catch (error) {
        console.log(`Error updating comment with ID ${id_comment}:`, error);
      }
    } else {
      const commentDataForCreate = {
        body,
        user_id: user.id,
        post_id: id_post
      };
      try {
        await apiPostComment(commentDataForCreate);
        navigate(`/comments/${id_post}`);
      } catch (error) {
        console.log(`Error creating comment with ID ${id_comment}:`, error);
      }
    }
  };
  return (
    <div className='container'>
      {isEditing ? <h2>Edit Comment</h2> : <h2>Create Comment</h2>}
      <form onSubmit={handleSubmit}>
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
        <i class="bi bi-check-circle me-2"></i>
          {isEditing ? 'Update' : 'Create'}
        </button>

        <div className="alert">will be {isEditing ? 'updated' : 'created'} by : {user.username}</div>
      </form>
    </div>
  );
};

export default CommentForm;
