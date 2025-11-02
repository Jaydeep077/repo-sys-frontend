import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RepositoryList from './pages/RepositoryList';
import CreateRepository from './pages/CreateRepository';
import authService from './services/authService';
import 'bootstrap/dist/css/bootstrap.min.css';
import RepositoryDetail from './pages/RepositoryDetail';

// Protected Route Component
function PrivateRoute({ children }) {
    return authService.isAuthenticated() ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/repositories"
                        element={
                            <PrivateRoute>
                                <RepositoryList />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/create-repository"
                        element={
                            <PrivateRoute>
                                <CreateRepository />
                            </PrivateRoute>
                        }
                    />
                   
                    <Route
                        path="/repositories/:id"
                        element={
                            <PrivateRoute>
                                <RepositoryDetail />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}


export default App;
