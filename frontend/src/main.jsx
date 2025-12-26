// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import ReflectedXSSPage from '../pages/ReflectedXSS.jsx';
import StoredXSSPage from '../pages/StoredXSS.jsx';
import StoredXSSList from '../pages/StoredXSSList.jsx';
import DOMXSSPage from '../pages/DOMXSS.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/reflected" element={<ReflectedXSSPage />} />
        <Route path="/stored" element={<StoredXSSList />} />
        <Route path="/stored/post/:postId" element={<StoredXSSPage />} />
        <Route path="/dom" element={<DOMXSSPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);