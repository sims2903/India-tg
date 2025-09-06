// src/components/StatePage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// Import images
import img1 from '../images/1.png';
import img2 from '../images/2.png';
import img3 from '../images/3.png';
import img4 from '../images/4.png';
import img5 from '../images/5.png';
import img6 from '../images/6.png';
import img7 from '../images/7.png';
import img8 from '../images/8.png';
import img9 from '../images/9.png';
import img10 from '../images/10.png';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

const StatePage = () => {
  const { stateKey } = useParams();
  const formattedName = stateKey.replace(/-/g, ' ').toUpperCase();

  const indianAccentColor = '#ff7043'; // Indian saffron

  // Initial posts
  const initialPosts = [
    { 
      id: 1, 
      title: 'Travel Diary 1', 
      content: `Experience in ${formattedName}`, 
      image: images[Math.floor(Math.random() * images.length)],
      likes: 0,
      dislikes: 0,
      comments: []
    },
    { 
      id: 2, 
      title: 'Travel Diary 2', 
      content: `Beautiful places in ${formattedName}`, 
      image: images[Math.floor(Math.random() * images.length)],
      likes: 0,
      dislikes: 0,
      comments: []
    },
    { 
      id: 3, 
      title: 'Travel Diary 3', 
      content: `Food and culture in ${formattedName}`, 
      image: images[Math.floor(Math.random() * images.length)],
      likes: 0,
      dislikes: 0,
      comments: []
    },
  ];

  const [posts, setPosts] = useState(initialPosts);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [reviewTags, setReviewTags] = useState('');
  const [reviewImage, setReviewImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: posts.length + 1,
      title: reviewTitle || `Travel Diary ${posts.length + 1}`,
      content: reviewContent,
      tags: reviewTags.split(',').map(t => t.trim()),
      image: reviewImage ? URL.createObjectURL(reviewImage) : images[Math.floor(Math.random() * images.length)],
      likes: 0,
      dislikes: 0,
      comments: []
    };

    setPosts([newPost, ...posts]); // prepend new post
    setReviewTitle('');
    setReviewContent('');
    setReviewTags('');
    setReviewImage(null);
  };

  const handleLike = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleDislike = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, dislikes: p.dislikes + 1 } : p));
  };

  const handleAddComment = (id, commentText) => {
    if (!commentText) return;
    setPosts(posts.map(p => p.id === id ? { ...p, comments: [...p.comments, commentText] } : p));
  };

  return (
    <>
      <h1 style={{
        gridColumn: '1 / 4',
        textAlign: 'center',
        padding: '20px 0',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#d84315',
        fontFamily: "'Merriweather', serif",
        background: 'linear-gradient(to right, #fff3e0, #ffebee)',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
        marginBottom: '30px'
      }}>
        🙏 Namaste! Welcome to {formattedName}
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '30% 50% 20%',
          gridTemplateRows: 'auto auto',
          gap: '20px',
          padding: '40px',
          fontFamily: "'Merriweather', serif",
          minHeight: '100vh',
          background: 'linear-gradient(to right, #fff8f0, #fefefe)',
          color: '#333',
        }}
      >
        {/* Column 1 Row 1 - Tag Search */}
        <div style={{
          gridColumn: '1',
          gridRow: '1',
          background: '#fffdf9',
          padding: '20px',
          borderRadius: '12px',
          border: `2px solid ${indianAccentColor}`,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ color: indianAccentColor, borderBottom: `1px solid ${indianAccentColor}`, paddingBottom: '5px' }}>🔍 Search by Tags</h3>
          <input
            type="text"
            placeholder="Try: temples, beaches, food..."
            style={{
              width: '95%',
              padding: '12px',
              borderRadius: '8px',
              border: `1px solid ${indianAccentColor}`,
              fontSize: '14px',
              marginTop: '10px'
            }}
          />
        </div>

        {/* Column 1 Row 2 - Trending Reviews */}
        <div style={{
          gridColumn: '1',
          gridRow: '2',
          background: '#fffdf9',
          padding: '20px',
          borderRadius: '12px',
          border: `2px solid ${indianAccentColor}`,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ color: indianAccentColor }}>🔥 Trending Reviews</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
            {[1, 2, 3].map((item) => (
              <div key={item} style={{
                background: '#ffe9e0',
                padding: '12px',
                borderRadius: '8px',
                borderLeft: `5px solid ${indianAccentColor}`
              }}>
                <strong>Review Title {item}</strong>
                <p>Top travel experience from this week...</p>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2 - Main Feed */}
        <div style={{
          gridColumn: '2',
          gridRow: '1 / 3',
          background: '#ffffff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          overflowY: 'auto',
          maxHeight: '80vh', // make vertically scrollable
          border: `1px solid #ffe0b2`
        }}>
          <h2 style={{ color: indianAccentColor }}>{formattedName} Travel Feed</h2>
          {posts.map(post => (
            <div key={post.id} style={{
              borderBottom: '1px solid #ddd',
              paddingBottom: '18px',
              marginBottom: '18px'
            }}>
              <h4 style={{ margin: '0 0 8px 0' }}>{post.title}</h4>
              <img src={post.image} alt={post.title} style={{ width: '100%', borderRadius: '10px', marginBottom: '10px', height: '200px', objectFit: 'cover' }} />
              <p>{post.content}</p>
              {post.tags && <p style={{ fontStyle: 'italic', color: '#555' }}>Tags: {post.tags.join(', ')}</p>}
              <div style={{ marginTop: '8px' }}>
                <button style={buttonStyle} onClick={() => handleLike(post.id)}>👍 {post.likes}</button>
                <button style={buttonStyle} onClick={() => handleDislike(post.id)}>👎 {post.dislikes}</button>
                <button style={buttonStyle} onClick={() => {
                  const commentText = prompt('Enter your comment:');
                  handleAddComment(post.id, commentText);
                }}>💬 Comment ({post.comments.length})</button>
              </div>
              {post.comments.length > 0 && (
                <div style={{ marginTop: '8px' }}>
                  {post.comments.map((c, idx) => (
                    <p key={idx} style={{ background: '#f5f5f5', padding: '6px 8px', borderRadius: '6px', marginBottom: '4px' }}>💬 {c}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Column 3 - Review Form */}
        <div style={{
          gridColumn: '3',
          gridRow: '1 / 3',
          background: '#fffdf9',
          padding: '20px',
          borderRadius: '12px',
          border: `2px solid ${indianAccentColor}`,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ color: indianAccentColor }}>📤 Submit Your Experience</h3>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }} onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" required value={reviewTitle} onChange={e => setReviewTitle(e.target.value)} style={inputStyle} />
            <textarea placeholder="Write your travel story..." required value={reviewContent} onChange={e => setReviewContent(e.target.value)} style={{ ...inputStyle, minHeight: '120px' }} />
            <input type="text" placeholder="Tags (e.g., food, nature)" value={reviewTags} onChange={e => setReviewTags(e.target.value)} style={inputStyle} />
            <input type="file" accept="image/*" onChange={e => setReviewImage(e.target.files[0])} style={inputStyle} />
            <button type="submit" style={{
              padding: '12px',
              borderRadius: '6px',
              backgroundColor: indianAccentColor,
color: '#fff',
border: 'none',
fontWeight: 'bold'
}}>🚀 Post</button>
</form>
</div>
</div>
</>
);
};

// Common styles
const inputStyle = {
padding: '10px',
borderRadius: '6px',
border: '1px solid #ccc',
fontSize: '14px'
};

const buttonStyle = {
marginRight: '10px',
background: '#ffe0b2',
border: 'none',
padding: '6px 10px',
borderRadius: '4px',
cursor: 'pointer',
fontSize: '13px'
};

export default StatePage;
