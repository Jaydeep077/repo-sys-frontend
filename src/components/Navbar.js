import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Navbar() {
    const navigate = useNavigate();
    const isAuthenticated = authService.isAuthenticated();
    const currentUser = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    RepoSystem
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/repositories">
                                        Repositories
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/create-repository">
                                        Create Repository
                                    </Link>
                                </li>

                                {/* 👤 Username */}
                                <li className="nav-item">
                                    <span className="nav-link text-info fw-semibold">
                                        Hello, {currentUser?.username}
                                    </span>
                                </li>

                                {/* 🔗 GitHub Links */}
                                <li className="nav-item mx-2">
                                    <a
                                        href="https://github.com/Jaydeep077/repo-sys-backend"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="nav-link d-flex align-items-center"
                                    >
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                                            alt="GitHub"
                                            width="20"
                                            className="me-1"
                                        />
                                        Backend
                                    </a>
                                </li>
                                <li className="nav-item mx-2">
                                    <a
                                        href="https://github.com/Jaydeep077/repo-sys-frontend"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="nav-link d-flex align-items-center"
                                    >
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                                            alt="GitHub"
                                            width="20"
                                            className="me-1"
                                        />
                                        Frontend
                                    </a>
                                </li>

                                {/* 🚪 Logout Button */}
                                <li className="nav-item">
                                    <button
                                        className="btn btn-outline-light btn-sm ms-2"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
