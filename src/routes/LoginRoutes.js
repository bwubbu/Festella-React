import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';

function LoginRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
    </Routes>
  );
}

export default LoginRoutes;