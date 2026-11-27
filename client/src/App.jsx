import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar/Navbar';
import { Footer } from './components/layout/Footer/Footer';
import { AuthModal } from './components/auth/AuthModal/AuthModal';
import { Home } from './pages/Home';
import { EnterDetails } from './pages/EnterDetails';
import { Information } from './pages/Information';
import { Explore } from './pages/Explore';

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-root">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/enter-details" element={<EnterDetails />} />
            <Route path="/information" element={<Information />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
          <AuthModal />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
