import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from  './components/Login';
import Register from './components/Register';
import IndiaMap from './components/IndiaMap';
import StatePage from './components/StatePage';
import MyPage from './components/MyPage';
import ReviewComponent from './components/ReviewComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/indiamap" element={<IndiaMap />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/state/:stateKey" element={<StatePage />} />
        <Route path="/get/reviews"element={<ReviewComponent/>}/>
    </Routes>
    </Router>
  );
}

export default App;
