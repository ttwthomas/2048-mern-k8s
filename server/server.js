// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI )
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
const scoresRouter = require('./routes/scores');
app.use('/api/scores', scoresRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Serve high scores page
app.get('/scores', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'scores.html'));
});

// The "catchall" handler: for any request that doesn't match above, send React's index.html
// app.get('*', (req, res) => {
//    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
// });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

