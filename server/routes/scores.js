// server/routes/scores.js
const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// POST /api/scores - Register a new score
router.post('/', async (req, res) => {
    const { name, score } = req.body;

    if (!name || typeof score !== 'number') {
        return res.status(400).json({ message: 'Name and score are required.' });
    }

    try {
        const newScore = new Score({ name, score });
        await newScore.save();
        res.status(201).json(newScore);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// GET /api/scores - Get highest scores
router.get('/', async (req, res) => {
    try {
        const topScores = await Score.find().sort({ score: -1 }).limit(10);
        res.json(topScores);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;

