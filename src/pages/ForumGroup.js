import React, { useState, useEffect } from 'react';
import Sidebar from '../components/CCSidebar';
import '../styles/forum.css';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEvent } from '../components/EventContext';

function ForumGroup() {
  const { isAuthenticated, user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [inviteUsername, setInviteUsername] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const navigate = useNavigate();
  const { allEvents } = useEvent();

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchGroups();
    }
  }, [isAuthenticated, user]);

  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/groups');
      const allGroups = response.data;
      const userGroups = allGroups.filter(group => group.members.includes(user.userId));
      setGroups(allGroups);
      setUserGroups(userGroups);
    } catch (error) {
      console.error('Error fetching groups:', error.message);
    }
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('User is not logged in.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/groups', {
        name: groupName, userId: user.userId });
      setGroups([...groups, response.data]);
      setUserGroups([...userGroups, response.data]);
      setGroupName('');
    } catch (error) {
      console.error('Error creating group:', error.message);
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!selectedGroupId) {
      alert('Please select a group first.');
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/groups/${selectedGroupId}/invite`, { username: inviteUsername });
      alert('User invited successfully');
      setInviteUsername('');
    } catch (error) {
      console.error('Error inviting user:', error.message);
      alert('Failed to invite user. Please try again.');
    }
  };

  const handleEventClick = async (eventId) => {
    navigate(`/event_details/${eventId}`);
  };

  const getEventDetails = (eventId) => {
    return allEvents.find(event => event._id === eventId);
  };

  if (!isAuthenticated || !user) {
    return <div>Please log in to view and manage your groups.</div>;
  }

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="containerForum">
        <div className="most-popular">
          {userGroups.map(group => (
            <div key={group._id} className="heading-section">
              <h4><em><Link to={`/groups/${group._id}`} style={{ color: 'inherit' }}>{group.name}</Link></em></h4>
              <div className="row">
                {Array.isArray(group.events) && group.events.map(eventId => {
                  const event = getEventDetails(eventId);
                  return event ? (
                    <div className="col-lg-3 col-sm-6" key={event._id}>
                      <div className="item" onClick={() => handleEventClick(event._id)}>
                        <img src={event.images[0]} alt={event.name} />
                        <h4>{event.name}<br /></h4>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="main-border-button" style={{ margin: '2%' }}>
          <Link to="/browse">Add events</Link>
        </div>
        <div className="create-group">
          <h2>Create Group</h2>
          <form onSubmit={handleCreateGroup}>
            <input
              type="text"
              placeholder="Group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
            <button type="submit">Create</button>
          </form>
        </div>
        <div className="invite-users">
          <h2>Invite Users</h2>
          <select onChange={(e) => setSelectedGroupId(e.target.value)} value={selectedGroupId}>
            <option value="">Select Group</option>
            {userGroups.map(group => (
              <option key={group._id} value={group._id}>{group.name}</option>
            ))}
          </select>
          <form onSubmit={handleInvite}>
            <input
              type="text"
              placeholder="Enter username"
              value={inviteUsername}
              onChange={(e) => setInviteUsername(e.target.value)}
            />
            <div className="main-border-button" style={{ margin: '2%' }}>
              <button type="submit">Invite</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForumGroup;
