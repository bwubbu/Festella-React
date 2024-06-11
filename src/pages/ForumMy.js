import React, { useState, useEffect } from 'react';
import Sidebar from '../components/CCSidebar';
import '../styles/forum.css';
import { useAuth } from '../components/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForumMy = () => {
  const { isAuthenticated, user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchMyPosts = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          const myPosts = response.data.filter(post => post.user === user._id);
          setPosts(myPosts);
        } catch (error) {
          console.error('Error fetching user posts:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMyPosts();
  }, [isAuthenticated, user]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user`);
        const userMap = {};
        response.data.forEach(user => {
          userMap[user._id] = user.username;
        });
        setUsers(userMap);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!posts || Object.keys(posts).length === 0) {
    return (
      <div>
      <Sidebar/>
      No posts available</div>
    );
  }

  return (
    <div className="forumPage">
      <Sidebar />
      <div className="containerForum">
        <div className="most-popular">
          <div className="heading-section">
            <h4><em>My Posts</em></h4>
          </div>
        </div>
        {posts.map(post => (
          <div key={post._id} className="subforum-row">
            <div className="subforum-icon subforum-column center">
              <img src={post.imageUrl} alt="Create Post" className="forum-image" />
            </div>
            <div className="subforum-description subforum-column-text">
              <h4><Link to={`/forum/forumdetail/${post._id}`}>{post.title}</Link></h4>
              <p>{post.content}</p>
            </div>
            <div className="subforum-info subforum-column-text">
              <span>{post.comments.length} 💬</span>
            </div>
            <div className="subforum-info subforum-column-text">
            by <a className="forum" href="#">{users[post.user]}</a>
              <br /><small>{new Date(post.createdAt).toLocaleDateString()}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumMy;
