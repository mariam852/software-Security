// src/components/XssLabCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './XssLabCard.css';

// SVG for the LAB icon (a simple flask/beaker)
const LabIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <line x1="10" y1="9" x2="10" y2="9"></line>
  </svg>
);

// Component for the first two styles (white background)
const StandardLabCard = ({ description, path }) => (
  <Link to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
    <div className="lab-card">
      <div className="lab-card-content">
        <div className="lab-icon-pill">
          <LabIcon />
          <span>LAB</span>
        </div>
        <div className="lab-description">
          <div className="lab-pill-group">
              <span className="apprentice-pill">APPRENTICE</span>
              <span className="label-text">{description}</span>
          </div>
          <span>&rarr;</span>
        </div>
      </div>
    </div>
  </Link>
);

// Component for the DOM lab (should match the standard card style)
const DOMLabCard = ({ description, path }) => (
  <Link to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
    <div className="lab-card">
      <div className="lab-card-content">
        <div className="lab-icon-pill">
          <LabIcon />
          <span>LAB</span>
        </div>
        <div className="lab-description">
          <div className="lab-pill-group">
            <span className="apprentice-pill">APPRENTICE</span>
            <span className="label-text">{description}</span>
          </div>
          <span>&rarr;</span>
        </div>
      </div>
    </div>
  </Link>
);

// Main export component
const XssLabCard = ({ type, description, path }) => {
  if (type === 'dom') {
    return <DOMLabCard description={description} path={path} />;
  }
  return <StandardLabCard description={description} path={path} />;
};

export default XssLabCard;