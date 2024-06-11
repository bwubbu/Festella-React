import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/CCSidebar';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/forum.css';

const CreatePostForm = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    title: '',
    content: '',
    category: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  }; 

  const handleImageChange = (e) => {
    setPostData({ ...postData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    formData.append('category', postData.category);
    formData.append('user', user._id); // Make sure to use the correct user ID
    if (postData.image) {
      formData.append('image', postData.image);
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/posts/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
        },
      });

      console.log('Post created successfully:', response.data);
      alert('Post created successfully');
      navigate('/forum'); // Navigate to the forum or any other page after post creation
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    }
  };

  return (
    <div className="containerForum">
      <h1 className="forum">Create New Post</h1>
      <form onSubmit={handleSubmit} className="post-form" encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea id="content" name="content" rows="8" required onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select id="category" name="category" onChange={handleChange}>
            <option value="">Select a category</option>
            <option value="option1">Past event</option>
            <option value="option2">Ongoing event</option>
            <option value="option3">Future event</option>
            <option value="option4">General</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const ForumPage = () => (
  <div className="forumPage">
    <Sidebar />
    <CreatePostForm />
  </div>
);

export default ForumPage;
