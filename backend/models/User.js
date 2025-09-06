const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Preferences for personalized recommendations
  preferences: {
    weather: [String],       // e.g., ['Sunny', 'Cold']
    ageGroup: String,        // e.g., '18-25'
    locationType: [String],  // e.g., ['Hilly', 'Beach']
    interests: [String],     // e.g., ['Adventure', 'Food']
    frequency: String,       // e.g., 'Monthly'
    budget: String,          // e.g., 'Medium'
    companions: [String],    // e.g., ['Solo', 'Family']
    duration: String,        // e.g., '4-7 days'
    climate: String          // e.g., 'Moderate'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
