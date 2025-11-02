import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

function Home() {
    const isAuthenticated = authService.isAuthenticated();

    return (
        <div className="container mt-5">
            <div className="text-center">
                <h1 className="display-4 mb-4">Welcome to RepoSystem</h1>
                <p className="lead mb-4">
                    A simple repository management system built with Spring Boot and React
                </p>
                
                {isAuthenticated ? (
                    <div>
                        <Link to="/repositories" className="btn btn-primary btn-lg me-3">
                            View Repositories
                        </Link>
                        <Link to="/create-repository" className="btn btn-success btn-lg">
                            Create Repository
                        </Link>
                    </div>
                ) : (
                    <div>
                        <Link to="/login" className="btn btn-primary btn-lg me-3">
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-success btn-lg">
                            Register
                        </Link>
                    </div>
                )}
                
                <div className="mt-5">
                    <h3>Features</h3>
                    <div className="row mt-4">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">User Authentication</h5>
                                    <p className="card-text">
                                        Secure login and registration with JWT tokens
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Repository Management</h5>
                                    <p className="card-text">
                                        Create, view, update, and delete repositories
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Private Repositories</h5>
                                    <p className="card-text">
                                        Keep your repositories private or make them public
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
