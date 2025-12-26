import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import '../styles/storedxss-list.css';
import post1Img from '../assets/pics/post1.svg';
import post2Img from '../assets/pics/post2.svg';
import post3Img from '../assets/pics/post3.svg';

const posts = [
  { id: 1, title: 'Why we like to blog', excerpt: 'An intro to our blogging philosophy', imageUrl: post1Img },
  { id: 2, title: 'Keeping the web secure', excerpt: 'Notes on secure defaults', imageUrl: post2Img },
  { id: 3, title: 'Paint by numbers', excerpt: 'A short story about creativity', imageUrl: post3Img },
];

const StoredXSSList = () => {
  const navigate = useNavigate();

  const handleClick = (postId) => {
    // When clicking a post, redirect to the specific Stored XSS post page
    navigate(`/stored/post/${postId}`);
  };

  return (
    <div className="lab-container stored-list">
      <div className="header-bar">
        <h1>Web Security Academy</h1>
        <div className="lab-title">
          <p>Stored XSS into HTML context with nothing encoded</p>
          <span className="lab-status">LAB Not solved</span>
        </div>
      </div>

      <hr className="divider" />

      <div className="blog-header">
        <nav>
          <button type="button" className="home-link" onClick={() => navigate(-1)}>Home</button>
        </nav>

        <div className="blog-logo">
          <h2>WE LIKE TO</h2>
          <h1>BLOG</h1>
        </div>

        <SearchBar />

        <div className="posts-grid">
          {posts.map((post) => (
            <article key={post.id} className="post-card" onClick={() => handleClick(post.id)} role="button" tabIndex={0}>
              <img src={post.imageUrl} alt={post.title} className="post-thumb" />
              <h3 className="post-title">{post.title}</h3>
              <p className="post-excerpt">{post.excerpt}</p>
              <button type="button" className="read-more" onClick={(e) => { e.stopPropagation(); handleClick(post.id); }}>Read post</button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoredXSSList;
