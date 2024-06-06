import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Vendor from './pages/Vendor';
import SearchVendor from './pages/SearchVendor';
import RegisterVendor from './pages/RegisterVendor';
import BookingVendor from './pages/BookingVendor';
import Login from './pages/Login';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vendor" element={<Vendor />} />
            <Route path="/vendor/search" element={<SearchVendor />} />
            <Route path="/vendor/register" element={<RegisterVendor />} />
            <Route path="/vendor/booking" element={<BookingVendor />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/forgotpassword" element={<ForgotPassword />} />
            <Route path="/profile/editprofile" element={<EditProfile />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App