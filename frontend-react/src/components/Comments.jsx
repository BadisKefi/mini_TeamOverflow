import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { getCommentsWithUsersAndWithPosts, deleteComment, getPostWithUserById } from './api';

function Comments({ user }) {

  const { id } = useParams();
  const [commentToDelete, setcommentToDelete] = useState();
  const [comments, setComments] = useState();
  const [post, setPost] = useState();

  useEffect(() => {
    apiPost();
    apiComments();
  });

  const apiPost = async () => {
    try {
      const foundPost = await getPostWithUserById(id);
      setPost(foundPost);
    } catch (error) {
      alert('Cannot perform the action due to an error');
    }
  }
  const apiComments = async () => {
    try {
      const comments = await getCommentsWithUsersAndWithPosts();
      const foundComments = comments.filter((comment) => comment.post.id == id);
      setComments(foundComments);
    } catch (error) {
      alert('Cannot perform the action due to an error');
    }
  }
  const deleteCommentPopUp = (comment) => {
    setcommentToDelete(comment ? comment : null);
  };
  const handleDeleteComment = async (comment) => {
    try {
      const message = await deleteComment(comment.id);
      apiComments();
    } catch (error) {
      alert('Cannot perform the action due to an error');
    }
  }

  return (
    <>
      <div className='container'>
        <h4>{post && post.title}</h4>
        <p>by : {post && post.user.username}</p>
        <Link to={`/commentForm/${id}`} className="btn btn-primary mb-3">
          Create Comment
        </Link>
        <ul className="list-group">
          {comments && comments.map((comment) => (
            <li key={comment.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
              <strong>{comment.body}</strong>
              <p>{comment.user.username}</p>
              </div>
              {user && user.username === comment.user.username ? (
                <div>
                  <Link to={`/commentForm/${id}/${comment && comment.id}`} className="btn btn-sm btn-primary me-2">Edit</Link>
                  <button onClick={() => deleteCommentPopUp(comment)} type="button" className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Delete</button>
                </div>
              ) : (
                <div></div>
              )}
            </li>
          ))}
        </ul>


        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">{commentToDelete && commentToDelete.title}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              
              <div className="modal-body">
                Are you sure you want to delete this comment ?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={() => handleDeleteComment(commentToDelete)} data-bs-dismiss="modal">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Comments;