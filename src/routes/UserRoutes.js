import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Profile from '../pages/Profile';
import EditProfile from '../pages/EditProfile';
import ForgotPassword from '../pages/ForgotPassword';

function UserRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/login/forgotpassword" element={<ForgotPassword />} />
      <Route path="/profile/editprofile" element={<EditProfile />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default UserRoutes;