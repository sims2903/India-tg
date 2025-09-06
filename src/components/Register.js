import React, { useState } from 'react';

const Register = () => {
  const [step, setStep] = useState(1);

  // Basic info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Preferences
  const [preferences, setPreferences] = useState({
  weather: [],
  ageGroup: '',
  locationType: [],
  interests: [],
  frequency: '',
  budget: '',
  companions: [],
  duration: '',
  climate: ''
});


  // Checkbox / Radio handlers
  const handleCheckboxChange = (category, value) => {
    setPreferences(prev => {
      const updated = prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value];
      return { ...prev, [category]: updated };
    });
  };

  const handleRadioChange = (category, value) => {
    setPreferences(prev => ({ ...prev, [category]: value }));
  };

  // Step 1 submit
  const handleBasicInfoSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setStep(2);
  };

  // Step 2 submit
  const handlePreferencesSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, preferences }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Registration successful! Please login.');
        window.location.href = '/login';
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>
      <div style={styles.container}>
        {/* Step Indicator */}
        <div style={styles.stepIndicator}>
          <div style={{ ...styles.stepCircle, backgroundColor: step===1 ? '#2575fc' : '#d7ccc8' }}>1</div>
          <div style={styles.stepLine}></div>
          <div style={{ ...styles.stepCircle, backgroundColor: step===2 ? '#2575fc' : '#d7ccc8' }}>2</div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <form onSubmit={handleBasicInfoSubmit} style={styles.form}>
            <h2 style={styles.title}>Create a New Account</h2>
            <p style={styles.subtitle}>Step 1: Basic Information</p>

            <label style={styles.label}>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} placeholder="Enter your full name" />

            <label style={styles.label}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} placeholder="Enter your email" />

            <label style={styles.label}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} placeholder="Create a password" />

            <label style={styles.label}>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={styles.input} placeholder="Confirm your password" />

            <button type="submit" style={styles.button}>Next: Preferences</button>
          </form>
        )}

        {/* Step 2: Preferences */}
        {step === 2 && (
  <form onSubmit={handlePreferencesSubmit} style={styles.form}>
    <h2 style={styles.title}>Step 2: Preferences</h2>
    <p style={styles.subtitle}>Tell us what you like!</p>

    {/* Weather */}
    <div style={styles.field}>
      <label style={styles.label}>Preferred Weather:</label><br />
      {['Sunny', 'Rainy', 'Cold', 'Hot'].map(opt => (
        <label key={opt} style={styles.optionLabel}>
          <input type="checkbox" checked={preferences.weather.includes(opt)} onChange={() => handleCheckboxChange('weather', opt)} /> {opt}
        </label>
      ))}
    </div>

    {/* Age Group */}
    <div style={styles.field}>
      <label style={styles.label}>Age Group:</label><br />
      {['18-25','26-35','36-50','50+'].map(opt => (
        <label key={opt} style={styles.optionLabel}>
          <input type="radio" name="ageGroup" checked={preferences.ageGroup===opt} onChange={() => handleRadioChange('ageGroup', opt)} /> {opt}
        </label>
      ))}
    </div>

    {/* Location Type */}
    <div style={styles.field}>
      <label style={styles.label}>Preferred Location:</label><br />
      {['Hilly','Beach','Urban','Rural'].map(opt => (
        <label key={opt} style={styles.optionLabel}>
          <input type="checkbox" checked={preferences.locationType.includes(opt)} onChange={() => handleCheckboxChange('locationType', opt)} /> {opt}
        </label>
      ))}
    </div>

    {/* Travel Frequency */}
    <div style={styles.field}>
      <label style={styles.label}>Travel Frequency:</label><br />
      {['Occasionally','Monthly','Quarterly','Yearly'].map(opt => (
        <label key={opt} style={styles.optionLabel}>
          <input type="radio" name="frequency" checked={preferences.frequency===opt} onChange={() => handleRadioChange('frequency', opt)} /> {opt}
        </label>
      ))}
    </div>

    {/* Budget */}
    <div style={styles.field}>
      <label style={styles.label}>Budget:</label><br />
      {['Low','Medium','High'].map(opt => (
        <label key={opt} style={styles.optionLabel}>
          <input type="radio" name="budget" checked={preferences.budget===opt} onChange={() => handleRadioChange('budget', opt)} /> {opt}
        </label>
      ))}
    </div>

    {/* Companions */}
    <div style={styles.field}>
      <label style={styles.label}>Travel Companions:</label><br />
      {['Solo','Friends','Family','Couple'].map(opt => (
        <label key={opt} style={styles.optionLabel}>
          <input type="checkbox" checked={preferences.companions?.includes(opt)} onChange={() => handleCheckboxChange('companions', opt)} /> {opt}
        </label>
      ))}
    </div>

    {/* Duration */}
    <div style={styles.field}>
      <label style={styles.label}>Preferred Trip Duration:</label><br />
      {['1-3 days','4-7 days','8+ days'].map(opt => (
        <label key={opt} style={styles.optionLabel}>
          <input type="radio" name="duration" checked={preferences.duration===opt} onChange={() => handleRadioChange('duration', opt)} /> {opt}
        </label>
      ))}
    </div>

    {/* Interests / Activities */}
    <div style={styles.field}>
      <label style={styles.label}>Interests / Activities:</label><br />
      {['Adventure','Relaxation','Cultural','Food','Shopping','Photography'].map(opt => (
        <label key={opt} style={styles.optionLabel}>
          <input type="checkbox" checked={preferences.interests.includes(opt)} onChange={() => handleCheckboxChange('interests', opt)} /> {opt}
        </label>
      ))}
    </div>

    {/* Climate Preference */}
    <div style={styles.field}>
      <label style={styles.label}>Climate Preference:</label><br />
      {['Hot','Cold','Moderate','Rainy'].map(opt => (
        <label key={opt} style={styles.optionLabel}>
          <input type="radio" name="climate" checked={preferences.climate===opt} onChange={() => handleRadioChange('climate', opt)} /> {opt}
        </label>
      ))}
    </div>

    <button type="submit" style={styles.button}>Register</button>
    <button type="button" onClick={() => setStep(1)} style={{ ...styles.button, backgroundColor:'#8d6e63', marginLeft:'10px' }}>Back</button>
  </form>


        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundImage: "url('/india-bg-reg.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Noto Sans', sans-serif",
    color: '#3e2723',
    padding: '20px',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(255, 243, 224, 0.3)',
    zIndex: 0,
  },
  container: {
    position: 'relative',
    zIndex: 1,
    backgroundColor: '#FFF8E1',
    padding: '40px',
    borderRadius: '15px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.5)',
    transition: 'all 0.5s ease',
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
    color: '#8d6e63',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: { fontWeight: '600', marginBottom: '8px', fontSize: '0.95rem' },
  input: { padding: '12px 15px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #d7ccc8', fontSize: '1rem' },
  button: { backgroundColor:'#6d4c41', color:'#fff', padding:'12px', fontSize:'1.1rem', fontWeight:'700', borderRadius:'8px', border:'none', cursor:'pointer', transition:'background-color 0.3s ease', marginTop:'15px' },
  field: { marginBottom: '15px' },
  optionLabel: { marginRight: '15px', cursor:'pointer' },
  stepIndicator: { display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'25px' },
  stepCircle: { width:'30px', height:'30px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:'700' },
  stepLine: { flex:1, height:'4px', backgroundColor:'#d7ccc8' }
};

export default Register;
