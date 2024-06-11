import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { NavLink, Link } from 'react-router-dom';
import '../styles/NavBar.css';
import ReorderIcon from '@mui/icons-material/Reorder';
import { useAuth } from './AuthContext';
import { useEvent } from './EventContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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

  const handleLogout = () => {
    logout();
  }

  const [searchInput, setSearchInput] = useState('');
  const { allEvents } = useEvent();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults(allEvents.filter(event =>
      event.name.toLowerCase().includes(searchInput.toLowerCase())
    ))
  }, [searchInput]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  }

  return (
    <div className='navbar'>
      <div className='leftSide' id={openLinks ? "open" : "close"}>
        <NavLink to='/'><img src={logo} alt='logo' /></NavLink>
        <form id='search' action='#'>
          <input type='text' placeholder='Type Something' id='searchText' name='searchKeyword' value={searchInput} onChange={handleSearchChange} />
          <FontAwesomeIcon className='search-icon' icon={faSearch} />
        </form>
        {searchInput !== '' && searchResults.length > 0 && (
          <div className='event-list-results'>
            {searchResults.map(event => (
              <NavLink className='event-result-item' key={event._id} to='/browse/eventdetails' state={{ eventId: event._id }} onClick={() => setSearchInput('')} >
                <img src={event.images[0]} alt={event.name} />
                {event.name}
              </NavLink>
            ))}
          </div>
        )}
        <div className='hiddenLinks'>
          <NavLink exact="true" to="/" activeclassname="active">Home</NavLink>
          <NavLink to='/browse' activeclassname="active">Browse</NavLink>
          <NavLink to="/forum" activeclassname="active">Community</NavLink>
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
        <NavLink to="/forum" activeclassname="active">Community</NavLink>
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
