import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await authService.login(username, password);
            navigate('/repositories');
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Login</h2>
                            
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            </form>
                            
                            <p className="text-center mt-3">
                                Don't have an account? <Link to="/register">Register here</Link>
                            </p>

                            {/* 🔗 GitHub Repositories Section */}
                            <div className="text-center mt-4">
                                <h6 className="text-muted mb-2">Project Repositories</h6>
                                <div className="d-flex justify-content-center gap-4">
                                    <a
                                        href="https://github.com/Jaydeep077/repo-sys-backend"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none d-flex align-items-center"
                                    >
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                                            alt="GitHub"
                                            width="25"
                                            className="me-2"
                                        />
                                        <span>Backend</span>
                                    </a>
                                    <a
                                        href="https://github.com/Jaydeep077/repo-sys-frontend"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none d-flex align-items-center"
                                    >
                                        <img
                                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                                            alt="GitHub"
                                            width="25"
                                            className="me-2"
                                        />
                                        <span>Frontend</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
