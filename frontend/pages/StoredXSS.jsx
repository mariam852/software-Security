import React from 'react';
import '../styles/storedxss.css'; // Import the CSS file

// Sub-Component for the Header (Top Bar)
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { insertHtmlAndRunScripts } from '../utils/executeScripts';
import post1Img from '../assets/pics/post1.svg';
import post2Img from '../assets/pics/post2.svg';
import post3Img from '../assets/pics/post3.svg';

const Header = () => (
  <header className="header-bar">
    <div className="logo">
      WebSecurityAcademy
      <span className="logo-brace">{}</span>
    </div>
    <div className="lab-controls">
      <Link to="/stored" className="all-posts-link">All posts</Link>
    </div>
    <div className="lab-status">
      <span className="lab-label">LAB</span> Not solved
      <span className="lab-icon"></span>
    </div>
  </header>
);

// Sub-Component for the Main Blog Post Content
const BlogPost = ({ title, content, imageUrl }) => (
  <main className="blog-post">
    <h1 className="post-title">
      {title}
    </h1>
    <p className="post-description">
      {/* This is the "WE LIKE TO BLOG" text */}
      WE LIKE TO <span>BLOG</span>
    </p>
    <div className="post-image-container">
      <img src={imageUrl} alt="Blog post visual" className="post-image" />
    </div>
  </main>
);

// Sub-Component for a single Comment
const Comment = ({ name, date, text }) => (
  <div className="comment">
    <div className="comment-header">
      <span className="comment-icon">👤</span>
      <span className="comment-author">{name}</span>
      <span className="comment-date">| {date}</span>
    </div>
    <p className="comment-text">{text}</p>
  </div>
);

// Sub-Component for the Comment Form
const CommentForm = () => (
  <section className="comment-form-section">
    <h3 className="section-title">Leave a comment</h3>
    <form className="comment-form">
      <div className="form-group">
        <label htmlFor="comment-input">Comment:</label>
        <textarea id="comment-input" rows="6" required></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="name-input">Name:</label>
        <input type="text" id="name-input" required />
      </div>

      <div className="form-group">
        <label htmlFor="email-input">Email:</label>
        <input type="email" id="email-input" />
      </div>

      <div className="form-group">
        <label htmlFor="website-input">Website:</label>
        <input type="url" id="website-input" />
      </div>

      <button type="submit" className="post-comment-button">
        Post Comment
      </button>
    </form>
    <p className="back-to-blog">
      &lt; Back to Blog
    </p>
  </section>
);


// Main Component
const BlogPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const images = {
    '1': post1Img,
    '2': post2Img,
    '3': post3Img,
  };

  const selectedImage = postId ? (images[postId] || post1Img) : post1Img;

  const postTitle = postId ? `Stored post #${postId}` : 'Stored XSS into HTML context with nothing encoded';
  const frameRef = useRef(null);
  const [formState, setFormState] = useState({ username: '', content: '' });
  // Local stored comments (frontend-only)
  const [comments, setComments] = useState([
    { id: 1, username: 'Anna Nutherthing', date: '17 November 2025', content: 'Painting with numbers is a great hobby, try that.' },
    { id: 2, username: 'El Bow', date: '23 November 2025', content: 'Is there a time difference between the UK and the US?' },
    { id: 3, username: 'Alan Key', date: '28 November 2025', content: 'Can you move away from the computer and wash the dishes. Love Mom xx' },
    { id: 4, username: 'Penny Whistle', date: '30 November 2025', content: 'Have you got internet?' },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/comments/json');
        if (res.ok) {
          const list = await res.json();
          const mapped = list.map((c, idx) => ({ id: idx + 1, username: c.Username, date: new Date().toLocaleDateString(), content: c.Content }));
          setComments(mapped.reverse());
        }
      } catch (err) {
        // ignore
      }
    })();
  }, []);

  const submitComment = async (e) => {
    e.preventDefault();

    const body = new URLSearchParams();
    body.append('username', formState.username);
    body.append('content', formState.content);

    try {
      const res = await fetch('/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!res.ok) throw new Error('Backend POST failed');

      // fetch latest comments from backend JSON endpoint and render raw content
      const jsonRes = await fetch('/comments/json');
      if (jsonRes.ok) {
        const list = await jsonRes.json();
        const mapped = list.map((c, idx) => ({ id: idx + 1, username: c.Username, date: new Date().toLocaleDateString(), content: c.Content }));
        setComments(mapped.reverse());
      }
    } catch (err) {
      // Fallback: add comment locally
      const processed = formState.content.replace(/<alert>(.*?)<\/alert>/gs, (_, g1) => `<script>alert("${g1.replace(/\"/g, '\\\"')}")</script>`);
      const newComment = {
        id: comments.length + 1,
        username: formState.username,
        date: new Date().toLocaleDateString(),
        content: processed,
      };
      setComments((s) => [newComment, ...s]);
    }

    setFormState({ username: '', content: '' });
  };

  return (
    <div className="blog-page-container">
      <Header />
      <div className="content-wrapper">
        <button type="button" className="nav-home" onClick={() => navigate(-1)}>Home</button>
        <BlogPost
          title={postTitle}
          imageUrl={selectedImage}
        />

        <section className="comments-section">
          <h2 className="section-title comments-heading">Comments (backend)</h2>

          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ flex: 1 }}>
              <form onSubmit={submitComment} className="comment-form">
                <div className="form-group">
                  <label htmlFor="username">Name:</label>
                  <input id="username" value={formState.username} onChange={(e) => setFormState({ ...formState, username: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label htmlFor="content">Comment:</label>
                  <textarea id="content" rows="4" value={formState.content} onChange={(e) => setFormState({ ...formState, content: e.target.value })} required />
                </div>
                <button type="submit" className="post-comment-button">Post Comment</button>
              </form>
            </div>

            <div style={{ flex: 1 }}>
              <p>Live comments (frontend-only):</p>
              <div style={{ border: '1px solid #ddd', padding: 12, minHeight: 200 }}>
                {comments.map(c => (
                    <div key={c.id} style={{ marginBottom: 12 }}>
                      <div style={{ fontWeight: 'bold' }}>{c.username} <span style={{ fontWeight: 'normal' }}>| {c.date}</span></div>
                      <div ref={(el) => { if (el) insertHtmlAndRunScripts(el, c.content); }} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPage;