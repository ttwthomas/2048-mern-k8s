// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const promBundle = require("express-prom-bundle");

dotenv.config();

const app = express();
const metricsMiddleware = promBundle({
    buckets: [0.1, 0.2, 0.5, 1, 10,],
    includeMethod: true, 
    includePath: true,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use("/((?!style|js|favicon\.ico))*",metricsMiddleware);

// Connect to MongoDB
function connectDB() {
    mongoose.connect(process.env.MONGO_URI, {
        connectTimeoutMS: 5000, // 5s max time to establish a connection
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection failed:', err.message);
        console.log('Retrying in 10 seconds...');
        setTimeout(connectDB, 10000); // Retry after 10 seconds
    });
}
connectDB();

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

