const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, preferences } = req.body;
  console.log("Register payload received:", { name, email, password, preferences });
  try {
    
const hashed = await bcrypt.hash(password, 10);

const user = new User({
  name,
  email,
  password: hashed,
  preferences // save preferences object here
});

await user.save();

    res.status(201).json({ message: "User created!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ 
  token, 
  user: { 
    id: user._id,       // <-- add this
    name: user.name, 
    email: user.email,
    preferences: user.preferences // optional
  } 
});


  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
