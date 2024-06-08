import { Routes, Route } from 'react-router-dom';

import Profile from '../pages/Profile';
import EditProfile from '../pages/EditProfile';

function UserRoutes() {
  return (
    <Routes>
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/" element={<Profile />} />
    </Routes>
  );
};

export default UserRoutes;