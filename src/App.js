import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';

import VendorRoutes from './routes/VendorRoutes';
import UserRoutes from './routes/UserRoutes';

function App() {
  return (
    <div className='App'>
      <AuthProvider>
      <Router>
        <NavBar />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <VendorRoutes />
          <UserRoutes />
        </div>
        <Footer />
      </Router>
      </AuthProvider>
    </div>
  )
}

export default App