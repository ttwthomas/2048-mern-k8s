// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HighScores from './components/HighScores';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/game">Game</Link></li>
                        <li><Link to="/highscores">High Scores</Link></li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/game" element={<Game />} />
                    <Route path="/highscores" element={<HighScores />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
}

const Home = () => (
    <div>
        <h1>Welcome to the Game!</h1>
        <Link to="/game">Start Game</Link>
    </div>
);

// Game component that loads the static game.html
const Game = () => {
    return (
        <div>
            <iframe src="/game" title="Game" width="100%" height="600px" frameBorder="0"></iframe>
        </div>
    );
}

export default App;

