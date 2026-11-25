import React, { useState } from 'react';
import { Container } from '../../common/Container/Container';
import { Button } from '../../common/Button/Button';
import { useRequireAuth } from '../../../hooks/useRequireAuth';
import { APP_CONFIG } from '../../../config/appConfig';
import './Navbar.css';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Indiranagar, Bengaluru');
  const [searchQuery, setSearchQuery] = useState('');
  const { requireAuth } = useRequireAuth();

  const handleLocationClick = () => {
    requireAuth(() => {
      const newLoc = prompt('Change delivery / pickup location:', selectedLocation);
      if (newLoc) setSelectedLocation(newLoc);
    }, 'Sign in to save and manage your addresses.');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    requireAuth(() => {
      alert(`Searching for: ${searchQuery}`);
    }, 'Sign in to search surplus inventory across partner kitchens.');
  };

  const handleBrowseClick = () => {
    const dealsSection = document.getElementById('featured-deals');
    if (dealsSection) {
      dealsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleListStoreClick = () => {
    requireAuth(() => {
      alert('Redirecting to Merchant Portal');
    }, 'Sign in or register your food establishment to list surplus inventory.');
  };

  const handleAuthClick = () => {
    requireAuth(null, 'Sign in or register with your FoodLoop account to continue.');
  };

  return (
    <header className="navbar-header">
      <Container className="navbar-container">
        {/* Left: Professional Tech Logo */}
        <div className="navbar-left">
          <a href="#" className="navbar-brand">
            <svg className="navbar-logo-symbol" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#E23744" />
              <path
                d="M16 8C11.5817 8 8 11.5817 8 16C8 18.23 8.91 20.25 10.38 21.71L12.5 19.59C11.57 18.66 11 17.4 11 16C11 13.24 13.24 11 16 11H19.59L17.79 9.21L19.21 7.79L23.41 12L19.21 16.21L17.79 14.79L19.59 13H16V13ZM16 24C20.4183 24 24 20.4183 24 16C24 13.77 23.09 11.75 21.62 10.29L19.5 12.41C20.43 13.34 21 14.6 21 16C21 18.76 18.76 21 16 21H12.41L14.21 22.79L12.79 24.21L8.59 20L12.79 15.79L14.21 17.21L12.41 19H16V24Z"
                fill="#FFFFFF"
              />
            </svg>
            <span className="navbar-brand-name">
              food<span className="navbar-brand-loop">loop</span>
            </span>
          </a>

          {/* Blinkit-Style Location Pill */}
          <button className="navbar-location-blinkit" onClick={handleLocationClick} type="button">
            <div className="location-text-group">
              <span className="location-title">Pickup at</span>
              <div className="location-sub-group">
                <span className="location-value">{selectedLocation}</span>
                <svg className="location-chevron" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6l4 4 4-4" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Center: Clean, Corporate Search Bar (Zomato / Blinkit style) */}
        <form className="navbar-search-clean" onSubmit={handleSearchSubmit}>
          <svg className="search-icon" viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="#696969" strokeWidth="2">
            <circle cx="9" cy="9" r="6" />
            <path d="M13.5 13.5L18 18" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search for surplus bakery, meals, or nearby restaurants"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Right: Partner link + Single Unified Auth Button */}
        <div className="navbar-right">
          <button className="navbar-partner-btn" onClick={handleListStoreClick} type="button">
            Partner with us
          </button>
          
          <Button variant="primary" size="md" onClick={handleAuthClick}>
            Sign In
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`navbar-hamburger ${isMobileMenuOpen ? 'is-active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </Container>

      {/* Mobile Drawer */}
      <div className={`navbar-mobile-drawer ${isMobileMenuOpen ? 'is-open' : ''}`}>
        <button className="navbar-location-blinkit navbar-location-mobile" onClick={handleLocationClick}>
          <div className="location-text-group">
            <span className="location-title">Pickup location</span>
            <span className="location-value">{selectedLocation}</span>
          </div>
        </button>

        <form className="navbar-search-clean mobile-search" onSubmit={handleSearchSubmit}>
          <svg className="search-icon" viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="#696969" strokeWidth="2">
            <circle cx="9" cy="9" r="6" />
            <path d="M13.5 13.5L18 18" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search surplus items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <div className="mobile-links">
          <button className="mobile-link" onClick={() => { setIsMobileMenuOpen(false); handleBrowseClick(); }}>
            Browse Deals
          </button>
          <button className="mobile-link" onClick={() => { setIsMobileMenuOpen(false); handleListStoreClick(); }}>
            Partner With Us
          </button>
        </div>

        <Button variant="primary" size="md" fullWidth onClick={() => { setIsMobileMenuOpen(false); handleAuthClick(); }}>
          Sign In / Register
        </Button>
      </div>
    </header>
  );
};
