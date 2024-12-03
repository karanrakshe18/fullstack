const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// User Schema
const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  birthdate: Date
});

const User = mongoose.model('User', userSchema);

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 15000, // Increase timeout
  socketTimeoutMS: 45000,
  
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Route to serve HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Route to handle form submission
app.post('/submit-details', async (req, res) => {
  try {
    // Log received details
    console.log('Received User Details:');
    console.log('Full Name:', req.body.fullName);
    console.log('Email:', req.body.email);
    console.log('Phone:', req.body.phone);
    console.log('Birthdate:', req.body.birthdate);

    // Create new user document
    const newUser = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      birthdate: req.body.birthdate
    });

    // Save to database
    await newUser.save();

    console.log('User saved to database successfully!');
    res.send('Details received and saved successfully!');
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send('Error saving details');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});