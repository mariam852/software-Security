// src/App.jsx
import React from 'react';
import XssLabCard from './components/XssLabCard';

// Define the data for the labs
const labData = [
  {
    type: 'standard',
    description: 'Reflected XSS into HTML context with nothing encoded',
    path: '/reflected'
  },
  {
    type: 'standard',
    description: 'Stored XSS into HTML context with nothing encoded',
    path: '/stored'
  },
  {
    type: 'dom',
    description:
      'DOM XSS in document.write sink using source location.search',
    path: '/dom'
  },
];

const App = () => {
  // Use a simple container to hold the labs and the header
  const containerStyle = {
    width: '600px',
    padding: '20px',
  };

  const headerStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
    color: '#004d99', /* Primary blue color */
    marginBottom: '30px',
    marginTop: '0',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Cross-site scripting</h1>
      <div className="lab-list">
        {labData.map((lab, index) => (
          // In a real app, you'd use a unique lab ID, but index is fine for a recreation
          <XssLabCard
            key={index}
            type={lab.type}
            description={lab.description}
            path={lab.path}
          />
        ))}
      </div>
    </div>
  );
};

export default App;