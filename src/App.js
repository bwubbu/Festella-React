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
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App