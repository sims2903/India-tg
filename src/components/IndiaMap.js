import React from 'react';
import { useNavigate } from 'react-router-dom';
import stateAreas from './stateAreas';
import indiaMapImage from './assets/India-States-Map.png'; // Ensure the path is correct

const IndiaMap = () => {
  const navigate = useNavigate();

  const handleAreaClick = (key) => {
    navigate(`/state/${key}`);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', position: 'relative' }}>
      
      {/* Floating My Page Button */}
      <button
  onClick={() => navigate('/mypage')}
  style={{
    position: 'fixed',     
    top: '20px',           
    right: '20px',         
    padding: '23px 35px',  // increased size
    backgroundColor: 'black',
    color: '#fff',
    border: 'none',
    borderRadius: '15px',  // slightly bigger radius
    fontWeight: '700',
    fontSize: '22px',      // bigger font
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)', // slightly stronger shadow
    zIndex: 1000
  }}
>
  My Page
</button>


      <div style={{ 
        textAlign: 'center', 
        padding: '30px 20px', 
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
        color: 'white',
        background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)', 
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}>
        <h2 style={{ 
          fontWeight: '700', 
          fontSize: '2rem', 
          letterSpacing: '1.5px', 
          textShadow: '1px 1px 3px rgba(0,0,0,0.3)', 
          color: 'white',
          margin: 0
        }}>
          Click any state to visit your next destination online
        </h2>
      </div>

      <img src={indiaMapImage} useMap="#india-map" alt="India Map" />
      <map name="india-map">
        {stateAreas.map((state, index) => (
          <area
            key={index}
            alt={state.name}
            title={state.name}
            coords={state.coords}
            shape={state.shape}
            onClick={() => handleAreaClick(state.key)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </map>
    </div>
  );
};

export default IndiaMap;
