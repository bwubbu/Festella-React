import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import { VendorProvider } from './components/VendorContext';
import { EventProvider } from './components/EventContext';
import { ForumProvider } from './components/ForumContext';
import { ReviewProvider } from './components/ReviewContext';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PaymentF from './pages/PaymentF'
import EventForm from './components/EventForm';
import Forum from './routes/ForumRoutes';
import VendorRoutes from './routes/VendorRoutes';
import UserRoutes from './routes/UserRoutes';
import LoginRoutes from './routes/LoginRoutes';
import RSVPP from './pages/RSVPP';
import BrowseRoute from './routes/BrowseRoute';
import EventDetails from './pages/Eventdetails'; 

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <VendorProvider>
          <EventProvider>
            <ReviewProvider>
            <Router>
              <NavBar />
              <div className='container'>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/add-event" element={<EventForm />} />
                  <Route path="/browse/*" element={<BrowseRoute />} />
                  <Route path="/vendor/*" element={<VendorRoutes />} />
                  <Route path="/profile/*" element={<UserRoutes />} />
                  <Route path="/login/*" element={<LoginRoutes />} />
                  <Route path="/rsvpp" element={<RSVPP />} />
                  <Route path="/browse/eventdetails" element={<EventDetails />} /> 
                  <Route path="/paymentf" element={<PaymentF />} />
                <Route 
                  path="/forum/*" 
                  element={
                    <ForumProvider>
                      <Forum />
                    </ForumProvider>
                  } 
                />
              </Routes>
              </div>
              <Footer />
            </Router>
          </ReviewProvider>
          </EventProvider>
        </VendorProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
