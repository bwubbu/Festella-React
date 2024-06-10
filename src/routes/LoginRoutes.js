import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import CodeVerification from '../pages/CodeVerification';
import ChangePassword from '../pages/ChangePassword';

function LoginRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/verification" element={<CodeVerification />} />
      <Route path="/forgotpassword/change" element={<ChangePassword />} />
    </Routes>
  );
}

export default LoginRoutes;