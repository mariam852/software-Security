// frontend/pages/ReflectedXSS.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar'; 
import '../styles/reflectedxss.css'; // Import the new CSS file
import reflectedImg from '../assets/pics/random1.svg';
import { insertHtmlAndRunScripts } from '../utils/executeScripts';
import { useRef, useEffect, useState } from 'react';

const ReflectedXSSPage = () => {
  const navigate = useNavigate();
  return (
    <div className="lab-container">
      {/* --- Top Banner Section --- */}
      <div className="header-bar">
        <h1>Web Security Academy</h1>
        <div className="lab-title">
          <p>Reflected XSS into HTML context with nothing encoded</p>
          <span className="lab-status">LAB Not solved</span>
        </div>
      </div>

      <hr className="divider" />
      
      {/* --- Blog Header Section --- */}
      <div className="blog-header">
        <nav>
          <button type="button" className="home-link" onClick={() => navigate(-1)}>Home</button>
        </nav>
        
        <div className="blog-logo">
          <h2>WE LIKE TO</h2>
          <h1>BLOG</h1>
        </div>
        
        {/* --- Search Bar Component (single, wired to backend) --- */}
        <SearchBar onSearch={async (q) => {
          const container = document.getElementById('reflected-output');
          try {
            const res = await fetch(`/reflected?q=${encodeURIComponent(q)}`);
            if (!res.ok) throw new Error(`status ${res.status}`);
            const html = await res.text();
            container.innerHTML = html; // Inject HTML directly
            insertHtmlAndRunScripts(container); // Execute scripts
          } catch (err) {
            // Fallback: reflect locally so the search works even if backend is down
            const processed = q.replace(/<alert>(.*?)<\/alert>/gs, (_, g1) => `<script>alert("${g1.replace(/\"/g, '\\\"')}")</script>`);
            const html = `<p>Search results for: ${processed}</p>`;
            insertHtmlAndRunScripts(container, html);
          }
        }} placeholder={'q payload (e.g. <script>...)'} />

        {/* --- Main Content Image --- */}
        <div className="main-content-placeholder">
          {/* Hero image for the reflected page */}
          <img src={reflectedImg} alt="Random illustration" className="main-content-image" />
        </div>

        <section className="backend-lab">
          <h3>Reflected XSS</h3>

          <div id="reflected-output" style={{ border: '1px solid #ddd', padding: 12, minHeight: 70 }} />
          <div>
            <p>Use the search bar at the top to query the backend; returned HTML is injected into the page (vulnerable by design).</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReflectedXSSPage;