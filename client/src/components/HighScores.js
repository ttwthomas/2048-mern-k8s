// client/src/components/HighScores.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HighScores = () => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        fetchHighScores();
    }, []);

    const fetchHighScores = async () => {
        try {
            const res = await axios.get('/api/scores');
            setScores(res.data);
        } catch (err) {
            console.error('Error fetching high scores:', err);
        }
    };

    return (
        <div>
            <h1>High Scores</h1>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score, index) => (
                        <tr key={score._id}>
                            <td>{index + 1}</td>
                            <td>{score.name}</td>
                            <td>{score.score}</td>
                            <td>{new Date(score.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HighScores;

