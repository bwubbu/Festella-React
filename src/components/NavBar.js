import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';
import '../styles/NavBar.css';
import ReorderIcon from '@mui/icons-material/Reorder';
import { useAuth } from './AuthContext';

function NavBar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.log(error)
      alert('Failed to logout. Please try again.')
    }
  }

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
            <NavLink to="/profile" activeclassname="active">Profile</NavLink>
          ) : (
            <NavLink to='/login' activeclassname="active">Sign In</NavLink>
          )}
        </div>
      </div>
      <div className='rightSide'>
        <NavLink exact="true" to="/" activeclassname="active">Home</NavLink>
        <NavLink to='/browse' activeclassname="active">Browse</NavLink>
        <NavLink to="/vendor" activeclassname="active">Vendor</NavLink>
        {isAuthenticated && user ? (
          <div className='profile-dropdown'>
            <button className='user-button' onClick={toggleDropdown}>{user.username}</button>
            {dropdown && (
              <div className='dropdown'>
                <NavLink to='/profile' activeclassname="active">Profile</NavLink>
                <a href='/' onClick={handleLogout}>Log Out</a>
              </div>
            )}
          </div>
        ) : (
          <NavLink to='/login' activeclassname="active">Sign In</NavLink>
        )}
        <button onClick={toggleNavbar}><ReorderIcon /></button>
      </div>
    </div>
  )
}

export default NavBar;
