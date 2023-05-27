import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPostsWithUsers, deletePost } from './api';

function Posts({ user }) {
  const [postToDelete, setPostToDelete] = useState();
  const [posts, setPosts] = useState();

  useEffect(() => {
    apiPosts();
  });

  const apiPosts = async () => {
    try {
      const posts = await getPostsWithUsers();
      setPosts(posts);
    } catch (error) {
      alert('Cannot perform the action due to an error');
    }
  }
  const deletePostPopUp = (post) => {
    setPostToDelete(post ? post : null);
  };
  const handleDeletePost = async (post) => {
    try {
      const message = await deletePost(post.id);
      apiPosts();
    } catch (error) {
      alert('Cannot perform the action due to an error');
    }
  }

  return (
    <>
      <div className='container'>
        <h2>All Posts</h2>
        <Link to="/postform" className="btn btn-primary mb-3">
          <i class="bi bi-plus-circle me-2"></i>Create Post
        </Link>
        <ul className="list-group">
          {posts && posts.map((post) => (
            <li key={post.id} className="list-group-item d-flex justify-content-between align-items-center">
              <Link clessName="text-decoration-none" to={`/comments/${post.id}`}>
                <strong>{post.title}</strong>
                <p>{post.user.username}</p>
              </Link>

              {user && user.username === post.user.username ? (
                <div>
                  <div class="btn-group">
                  <Link to={`/postform/${post.id}`} className="btn btn-sm btn-primary"><i class="bi bi-pencil me-2"></i> Edit</Link>
                  <button onClick={() => deletePostPopUp(post)} type="button" className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-trash3 me-2"></i>Delete</button>
                  </div>
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
                <h5 class="modal-title" id="exampleModalCenterTitle">{postToDelete && postToDelete.title}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">
                Are you sure you want to delete this post ?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"><i class="bi bi-x-circle me-2"></i>Close</button>
                <button type="button" className="btn btn-primary" onClick={() => handleDeletePost(postToDelete)} data-bs-dismiss="modal"><i class="bi bi-trash3 me-2"></i>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Posts;