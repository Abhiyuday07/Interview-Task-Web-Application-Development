// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import LandingPage from './components/LandingPage';
import './styles.css';

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/landing"
                        element={authenticated ? <LandingPage setAuthenticated={setAuthenticated} /> : <Navigate to="/login" />}
                    />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
