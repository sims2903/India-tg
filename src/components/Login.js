import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();

    // Add this log here
    console.log('Login response:', data);
    console.log('user exists?',data.user);

    if (response.ok && data.user) {
      const { user, token } = data;
      localStorage.setItem('userId', user.id);
      localStorage.setItem('token', token);
      navigate('/indiamap');
    } else {
      alert(data.error || data.message || 'Login failed');
    }
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };
  

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Welcome to the Travel Guide</h2>
        <p style={styles.subtitle}>An inclusive space for everyone across India</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={styles.input} 
            placeholder="Enter your email"
          />

          <label style={styles.label}>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={styles.input} 
            placeholder="Enter your password"
          />

          <button type="submit" style={styles.button} >Login</button>
        </form>
        <p style={styles.footer}>
          New user? <a href="/register" style={styles.link}>Register here</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
   page: {
    backgroundImage: "url('/india-bg.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Noto Sans', sans-serif",
    color: '#fff',
    padding: '20px',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 0,
  },
  container: {
    position: 'relative',
    zIndex: 1,
    backgroundColor: '#FF7043',  // Solid deep saffron red background (you can change this color)
    padding: '40px',
    borderRadius: '15px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.5)', // stronger shadow for solid container
    border: 'none',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '5px',
    fontFamily: "'Merriweather', serif",
  },
  subtitle: {
    fontSize: '1rem',
    marginBottom: '25px',
    fontStyle: 'italic',
    color: '#ffd6d6',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: '600',
    marginBottom: '8px',
    fontSize: '0.95rem',
  },
  input: {
    padding: '12px 15px',
    marginBottom: '20px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
    fontFamily: "'Noto Sans', sans-serif",
  },
  button: {
    backgroundColor: '#d84315', // deep saffron red
    color: '#fff',
    padding: '12px',
    fontSize: '1.1rem',
    fontWeight: '700',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  footer: {
    marginTop: '20px',
    fontSize: '0.9rem',
  },
  link: {
    color: '#fff',
    fontWeight: '700',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

export default Login;
