import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';
import '../styles/NavBar.css';
import ReorderIcon from '@mui/icons-material/Reorder';
import { useAuth } from './AuthContext';

function NavBar() {
  const { isAuthenticated } = useAuth();
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <div className='navbar'>
      <div className='leftSide' id={openLinks ? "open" : "close"}>
        <img src={logo} alt='logo' />
        <form id='search' action='#'>
          <input type='text' placeholder='Type Something' id='searchText' name='searchKeyword' />
          <i></i>
        </form>
        <div className='hiddenLinks'>
          <NavLink exact="true" to="/" activeclassname="active">Home</NavLink>
          <NavLink to='/browse' activeclassname="active">Browse</NavLink>
          <NavLink to="/vendor" activeclassname="active">Vendor</NavLink>
          {isAuthenticated ? (
            <NavLink to="/Profile" activeclassname="active">Profile</NavLink>
          ) : (
            <NavLink to='/login' activeclassname="active">Sign In</NavLink>
          )}
        </div>
      </div>
      <div className='rightSide'>
        <NavLink exact="true" to="/" activeclassname="active">Home</NavLink>
        <NavLink to='/browse' activeclassname="active">Browse</NavLink>
        <NavLink to="/vendor" activeclassname="active">Vendor</NavLink>
        {isAuthenticated ? (
          <NavLink to="/Profile" className="profile-border-button" activeclassname="active">Profile</NavLink>
        ) : (
          <NavLink to='/login' activeclassname="active">Sign In</NavLink>
        )}
        <button onClick={toggleNavbar}><ReorderIcon /></button>
      </div>
    </div>
  )
}

export default NavBar;
