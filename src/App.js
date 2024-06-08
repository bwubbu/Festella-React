import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import { VendorProvider } from './components/VendorContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';

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
  )
}

export default App