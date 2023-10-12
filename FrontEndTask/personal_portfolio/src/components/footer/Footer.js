import React from 'react';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">Your Portfolio</div>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="footer-text">
          &copy; {new Date().getFullYear()} Your Name. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

