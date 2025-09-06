const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Sample destinations
  const destinations = [
  { name: 'Manali', type: 'Hilly', weather: 'Cold', activities: ['Adventure','Photography'], budget: 'Medium', companions: ['Solo','Friends'], duration: '4-7 days', climate: 'Moderate' },
  { name: 'Goa', type: 'Beach', weather: 'Sunny', activities: ['Relaxation','Food'], budget: 'High', companions: ['Family','Friends'], duration: '4-7 days', climate: 'Hot' },
  { name: 'Shimla', type: 'Hilly', weather: 'Cold', activities: ['Cultural','Photography'], budget: 'Medium', companions: ['Solo','Family'], duration: '4-7 days', climate: 'Moderate' },
  { name: 'Jaipur', type: 'City', weather: 'Hot', activities: ['Shopping','Cultural'], budget: 'Medium', companions: ['Friends','Family'], duration: '4-7 days', climate: 'Hot' },
  { name: 'Rishikesh', type: 'Hilly', weather: 'Cold', activities: ['Adventure','Relaxation'], budget: 'Medium', companions: ['Solo','Friends'], duration: '4-7 days', climate: 'Moderate' },
  { name: 'Darjeeling', type: 'Hilly', weather: 'Rainy', activities: ['Photography','Relaxation'], budget: 'Medium', companions: ['Friends','Family'], duration: '4-7 days', climate: 'Cold' },
  { name: 'Kolkata', type: 'City', weather: 'Hot', activities: ['Cultural','Food'], budget: 'Medium', companions: ['Friends','Family'], duration: '2-4 days', climate: 'Hot' },
  { name: 'Leh', type: 'Hilly', weather: 'Cold', activities: ['Adventure','Photography'], budget: 'High', companions: ['Solo','Friends'], duration: '7-10 days', climate: 'Cold' },
  { name: 'Kerala', type: 'Beach', weather: 'Sunny', activities: ['Relaxation','Photography'], budget: 'High', companions: ['Family','Friends'], duration: '4-7 days', climate: 'Hot' },
  { name: 'Udaipur', type: 'City', weather: 'Hot', activities: ['Cultural','Relaxation'], budget: 'Medium', companions: ['Friends','Family'], duration: '4-7 days', climate: 'Hot' },
  { name: 'Coorg', type: 'Hilly', weather: 'Rainy', activities: ['Relaxation','Photography'], budget: 'Medium', companions: ['Friends','Family'], duration: '4-7 days', climate: 'Moderate' },
  { name: 'Andaman', type: 'Beach', weather: 'Sunny', activities: ['Relaxation','Adventure'], budget: 'High', companions: ['Friends','Family'], duration: '4-7 days', climate: 'Hot' },
  { name: 'Varanasi', type: 'City', weather: 'Hot', activities: ['Cultural','Photography'], budget: 'Low', companions: ['Solo','Friends'], duration: '2-4 days', climate: 'Hot' },
  { name: 'Sikkim', type: 'Hilly', weather: 'Cold', activities: ['Adventure','Relaxation'], budget: 'Medium', companions: ['Friends','Family'], duration: '4-7 days', climate: 'Cold' },
  { name: 'Mysore', type: 'City', weather: 'Moderate', activities: ['Cultural','Shopping'], budget: 'Medium', companions: ['Friends','Family'], duration: '2-4 days', climate: 'Moderate' },
  { name: 'Goa North', type: 'Beach', weather: 'Rainy', activities: ['Relaxation','Shopping'], budget: 'Medium', companions: ['Friends','Family'], duration: '4-7 days', climate: 'Hot' },
  { name: 'Manipur', type: 'Hilly', weather: 'Cold', activities: ['Adventure','Relaxation'], budget: 'Medium', companions: ['Friends','Family'], duration: '4-7 days', climate: 'Cold' },
  { name: 'Hyderabad', type: 'City', weather: 'Hot', activities: ['Food','Shopping'], budget: 'Medium', companions: ['Friends','Family'], duration: '2-4 days', climate: 'Hot' },
  { name: 'Rajasthan Desert', type: 'Desert', weather: 'Hot', activities: ['Adventure','Photography'], budget: 'Medium', companions: ['Friends','Family'], duration: '4-7 days', climate: 'Hot' },
  { name: 'Shillong', type: 'Hilly', weather: 'Rainy', activities: ['Relaxation','Photography'], budget: 'Medium', companions: ['Friends','Family'], duration: '4-7 days', climate: 'Cold' }
];


router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const prefs = user.preferences;

    // Filter destinations based on user preferences
    const filtered = destinations.filter(d =>
  (!prefs.weather.length || prefs.weather.includes(d.weather)) &&
  (!prefs.locationType.length || prefs.locationType.includes(d.type)) &&
  (!prefs.interests.length || d.activities.some(a => prefs.interests.includes(a))) &&
  (!prefs.budget || prefs.budget === d.budget) &&
  (!prefs.companions.length || prefs.companions.some(c => d.companions.includes(c))) &&
  (!prefs.duration || prefs.duration === d.duration) &&
  (!prefs.climate || d.climate === prefs.climate)
);


    res.json({ user: { name: user.name, email: user.email }, recommendations: filtered });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
