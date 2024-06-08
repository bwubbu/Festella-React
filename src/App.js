import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import { VendorProvider } from './components/VendorContext';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Vendor from './pages/Vendor';
import SearchVendor from './pages/SearchVendor';
import RegisterVendor from './pages/RegisterVendor';
import BookingVendor from './pages/BookingVendor';
import Browse from './pages/Browse';
import Eventdetails from './pages/Eventdetails';
import EventForm from './components/EventForm';
import VendorCall from './components/CallVendor';

import VendorRoutes from './routes/VendorRoutes';
import UserRoutes from './routes/UserRoutes';
import LoginRoutes from './routes/LoginRoutes';
import ForumRoutes from './pages/Forum';
function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <VendorProvider>
          <Router>
            <NavBar />
            <div className='container'>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/browse/eventdetails" element={<Eventdetails />} />
                <Route path="/vendor" element={<Vendor />} />
                <Route path="/vendor/search" element={<SearchVendor />} />
                <Route path="/vendor/register" element={<RegisterVendor />} />
                <Route path="/vendor/booking" element={<BookingVendor />} />
                <Route path="/add-event" element={<EventForm />} />
                <Route path="/vendor/call" element={<VendorCall />} />
                <Route path="/vendor/*" element={<VendorRoutes />} />
                <Route path="/profile/*" element={<UserRoutes />} />
                <Route path="/login/*" element={<LoginRoutes />} />
                <Route path="/forum" element={<ForumRoutes />} />
              </Routes>
            </div>
            <Footer />
          </Router>
        </VendorProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
