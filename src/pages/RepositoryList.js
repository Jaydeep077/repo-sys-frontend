import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import repositoryService from '../services/repositoryService';

function RepositoryList() {
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchRepositories();
    }, []);

    const fetchRepositories = async () => {
        try {
            const data = await repositoryService.getAllRepositories();
            setRepositories(data);
        } catch (err) {
            setError('Failed to load repositories');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
            try {
                await repositoryService.deleteRepository(id);
                setRepositories(repositories.filter(repo => repo.id !== id));
                alert('Repository deleted successfully');
            } catch (err) {
                alert('Failed to delete repository');
            }
        }
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>My Repositories</h2>
                <Link to="/create-repository" className="btn btn-primary">
                    Create New Repository
                </Link>
            </div>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {repositories.length === 0 ? (
                <div className="alert alert-info">
                    No repositories found. Create your first repository!
                </div>
            ) : (
                <div className="row">
                    {repositories.map((repo) => (
                        <div key={repo.id} className="col-md-6 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {repo.name}
                                        {repo.isPrivate && (
                                            <span className="badge bg-warning ms-2">Private</span>
                                        )}
                                    </h5>
                                    <p className="card-text text-muted">
                                        {repo.description || 'No description'}
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            Owner: {repo.ownerUsername}
                                        </small>
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            Created: {new Date(repo.createdAt).toLocaleDateString()}
                                        </small>
                                    </p>
                                    <div className="btn-group" role="group">
                                        <Link
                                            to={`/repositories/${repo.id}`}
                                            className="btn btn-sm btn-outline-primary"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            to={`/repositories/${repo.id}/edit`}
                                            className="btn btn-sm btn-outline-secondary"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDelete(repo.id, repo.name)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RepositoryList;
