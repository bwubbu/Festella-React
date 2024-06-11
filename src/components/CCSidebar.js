// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import pencillogo from '../assets/logo-pencil.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>User Actions</h2>
      <ul>
        <li>
          <img src={pencillogo} alt="Create Post" className="icon-image" />
          <Link to="/forum/createforum">Create Post</Link>
        </li>
        <li>
          <img src={pencillogo} alt="My Posts" className="icon-image" />
          <Link to="/forum/myforums">My Posts</Link>
        </li>
        <li>
          <img src={pencillogo} alt="Collaborative Event List" className="icon-image" />
          <Link to="/forum/forumgroup">Collaborative Event List</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
