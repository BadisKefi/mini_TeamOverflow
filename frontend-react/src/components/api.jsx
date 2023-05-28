// const API_BASE_URL = "http://localhost:8000/api";
const API_BASE_URL = "http://192.168.1.4:8000/api";
// const API_BASE_URL = "http://127.0.0.1:8000/api";


export async function getPostsWithUsers() {
    try {
        const response = await fetch(`${API_BASE_URL}/post`);
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.log("Error fetching all posts:");
        return null;
    }
}
export async function getPostWithUserById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/post/${id}`);
        const post = await response.json();
        return post;
    } catch (error) {
        console.log(`Error fetching post with ID ${id}:`, error);
        return null;
    }
}
export async function createPost(postData) {
    try {
        const response = await fetch(`${API_BASE_URL}/post`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });
        return response.json();
    } catch (error) {
        console.log("Error creating a post:", error);
        return null;
    }
}
  
export async function updatePost(id, postData) {
    try {
        const response = await fetch(`${API_BASE_URL}/post/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });
        return response.json();
    } catch (error) {
        console.log(`Error updating post with ID ${id}:`, error);
        return null;
    }
}
export async function deletePost(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/post/${id}`, {
            method: "DELETE",
        });
        const message = await response.json();
        return message;
    } catch (error) {
        console.log(`Error deleting post with ID ${id}:`, error);
        return null;
    }
}

export async function getCommentsWithUsersAndWithPosts() {
    try {
        const response = await fetch(`${API_BASE_URL}/comment`);
        const comments = await response.json();

        return comments;
    } catch (error) {
        console.log(`Error fetching comments with posts and users}:`, error);
        return null;
    }
}
export async function getCommentWithUserAndWithPostById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/comment/${id}`);
        const comment = await response.json();
        return comment;
    } catch (error) {
        console.log(`Error fetching comment with ID ${id}:`, error);
        return null;
    }
}
export async function createComment(commentData) {
    try {
        const response = await fetch(`${API_BASE_URL}/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentData),
        });
        return response.json();
    } catch (error) {
        console.log("Error creating a comment:", error);
        return null;
    }
}
export async function updateComment(id, commentData) {
    try {
        const response = await fetch(`${API_BASE_URL}/comment/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentData),
        });
        return response.json();
    } catch (error) {
        console.log(`Error updating comment with ID ${id}:`, error);
        return null;
    }
}
export async function deleteComment(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/comment/${id}`, {
            method: "DELETE",
        });
        return response.json();
    } catch (error) {
        console.log(`Error deleting comment with ID ${id}:`, error);
        return null;
    }
}

export async function getAllUsers() {
    try {
        const response = await fetch(`${API_BASE_URL}/user`);
        const users = await response.json();
        return users;
    } catch (error) {
        console.log("Error fetching all users:");
        return null;
    }
}
export async function getUserById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${id}`);
        return response.json();
    } catch (error) {
        console.log(`Error fetching user with ID ${id}:`, error);
        return null;
    }
}
export async function getUserByUsername(username) {
    try {
        const response = await fetch(`${API_BASE_URL}/user/username/${username}`);
        const user = await response.json();
        return user;
    } catch (error) {
        console.log(`Error fetching user with username ${username}:`, error);
        return null;
    }
}

export async function createUser(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        return response.json();
    } catch (error) {
        console.log("Error creating a user:", error);
        return null;
    }
}