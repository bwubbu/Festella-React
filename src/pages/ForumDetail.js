import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/forum.css';
import Sidebar from '../components/CCSidebar';
import { useAuth } from '../components/AuthContext';
import profilePicture from '../assets/pfpplaceholder.jpg';

const ForumDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState('');
  const { isAuthenticated, user } = useAuth();
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user`);
        const userMap = {};
        response.data.forEach(user => {
          userMap[user._id] = user;
        });
        setUsers(userMap);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleCommentSubmit = async (event, postId) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/posts/${postId}/comments`, {
        content: commentContent,
        user: user._id,  // Send user ID with the comment content
      }, { headers: { Authorization: `Bearer ${isAuthenticated}` } });
      setPost(prevPost => ({
        ...prevPost,
        comments: [...prevPost.comments, response.data]
      }));
      setCommentContent('');
    } catch (error) {
      console.error('Error submitting comment:', error);
      if (error.response) {
        console.error('Server responded with status:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received from server');
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const getProfileImage = (user) => {
    if (user && user.profile && user.profile.image) {
      
      return user.profile.image;
    }
    console.log(post.user);
    return profilePicture; // Default profile picture if no image is available
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!post) {
    return <div>Post does not exist!</div>;
  }

  return (
    <div className="forumPage">
      <Sidebar />

      <div className="containerForum">
        <div className="topic-container">
          <div className="head">
          <h4 className="post-title">{post.title}</h4>
          </div>

          <div className="body">
            <div className="authors">
              <div className="username">
                <a>{post.user.username}</a>
              </div>
              <img
                style={{ borderRadius: '100%' }}
                src={getProfileImage(post.user.profileImage)}
                alt={post.user.username}
              />
            </div>
            <div className="content">
              {post.content} <br />
              <img src={post.imageUrl} alt="Post" className="post-image" />
            </div>
            <div className="date">{formatDate(post.createdAt)}</div>
          </div>
        </div>

        {post.comments && post.comments.map((comment) => (
          <div key={comment._id} className="comments-container">
            <div className="body">
              <div className="authors">
                <div className="username">
                  <a href="">{comment.user.username}</a>
                </div>
                <img
                  style={{ borderRadius: '100%' }}
                  src={getProfileImage(comment.user.profileImage)}
                  alt={comment.user.username}
                />
              </div>
              <div className="content">
                {comment.content}
              </div>
              <div className="date">{formatDate(comment.createdAt)}</div>
            </div>
          </div>
        ))}

        <div className="comment-area" id="comment-area-1">
          <textarea
            name="comment"
            placeholder="Comment here..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          ></textarea>
          <input type="submit" value="Submit" onClick={(e) => handleCommentSubmit(e, post._id)} />
        </div>
      </div>
    </div>
  );
};

export default ForumDetail;
