import React from 'react';
import { Container } from '../../common/Container/Container';
import { APP_CONFIG } from '../../../config/appConfig';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer-root">
      <Container className="footer-container">
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="footer-brand">
              <svg className="footer-logo-symbol" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#E23744" />
                <path
                  d="M16 8C11.5817 8 8 11.5817 8 16C8 18.23 8.91 20.25 10.38 21.71L12.5 19.59C11.57 18.66 11 17.4 11 16C11 13.24 13.24 11 16 11H19.59L17.79 9.21L19.21 7.79L23.41 12L19.21 16.21L17.79 14.79L19.59 13H16V13ZM16 24C20.4183 24 24 20.4183 24 16C24 13.77 23.09 11.75 21.62 10.29L19.5 12.41C20.43 13.34 21 14.6 21 16C21 18.76 18.76 21 16 21H12.41L14.21 22.79L12.79 24.21L8.59 20L12.79 15.79L14.21 17.21L12.41 19H16V24Z"
                  fill="#FFFFFF"
                />
              </svg>
              <span className="footer-brand-name">
                food<span className="footer-brand-highlight">loop</span>
              </span>
            </div>
            <p className="footer-tagline">
              India's tech platform enabling food businesses to eliminate end-of-day waste and maximize revenue through hyperlocal redistribution.
            </p>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-col-title">Platform</h4>
            <ul className="footer-links">
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#featured-deals">Surplus Feed</a></li>
              <li><a href="#why-choose-us">Enterprise Impact</a></li>
              <li><a href="#">Category Explorer</a></li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-col-title">For Kitchens</h4>
            <ul className="footer-links">
              <li><a href="#">Merchant Onboarding</a></li>
              <li><a href="#">FSSAI Guidelines</a></li>
              <li><a href="#">Store Portal</a></li>
              <li><a href="#">Case Studies</a></li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links">
              <li><a href={`mailto:${APP_CONFIG.contactEmail}`}>Contact Leadership</a></li>
              <li><span>Bengaluru • Mumbai • Delhi NCR</span></li>
              <li><a href="#">Privacy & Compliance</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} FoodLoop Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">FSSAI Food Safety Norms</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
