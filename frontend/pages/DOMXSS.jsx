import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import postImg from '../assets/pics/post1.svg';
import '../styles/domxss.css';
import { useState } from 'react';
import { insertHtmlAndRunScripts } from '../utils/executeScripts';

const DOMXSSPage = () => {
  const navigate = useNavigate();

  return (
    <div className="lab-container">
      {/* --- Top Banner Section --- */}
      <div className="header-bar">
        <h1>Web Security Academy</h1>
        <div className="lab-title">
          <p>DOM-based XSS into HTML context</p>
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

        {/* --- Search Bar Component (wired to backend/dom API) --- */}
        <SearchBar onSearch={async (q) => {
          const container = document.getElementById('dom-output');
          try {
            const res = await fetch(`/dom/api?q=${encodeURIComponent(q)}`);
            if (!res.ok) throw new Error('backend failed');
            const html = await res.text();
            insertHtmlAndRunScripts(container, html);
          } catch (err) {
            // fallback to client-side reflection (and support <alert> helper)
            const processed = q.replace(/<alert>(.*?)<\/alert>/gs, (_, g1) => `<script>alert("${g1.replace(/\"/g, '\\\"')}")</script>`);
            const html = `You searched for: ${processed}`;
            insertHtmlAndRunScripts(container, html);
          }
        }} placeholder={'Enter query (e.g. ?q=<alert>alert</alert>)'} />

        {/* --- Main Content Image (post) --- */}
        <div className="main-content-placeholder">
          <img src={postImg} alt="Blog post" className="main-content-image" />
        </div>

        <section className="backend-lab">
          <h3>DOM XSS (frontend-only simulation)</h3>
          <p>Enter a query string or script into the search box and submit to see it reflected.</p>

          <div id="dom-output" style={{ border: '1px solid #ddd', padding: 12, minHeight: 70 }} />
        </section>
      </div>
    </div>
  );
};

export default DOMXSSPage;

const DomLabFrame = () => {
  const [q, setQ] = useState('');
  const src = `http://localhost:5000/?${q}`;

  return (
    <div className="dom-lab-frame">
      <div style={{ marginBottom: 8 }}>
        <input placeholder="q=payload or any query string (e.g. q=<script>...)" value={q} onChange={(e) => setQ(e.target.value)} style={{ width: '70%' }} />
      </div>
      <iframe title="dom-lab" src={src} style={{ width: '100%', height: 360, border: '1px solid #ddd' }} />
    </div>
  );
};