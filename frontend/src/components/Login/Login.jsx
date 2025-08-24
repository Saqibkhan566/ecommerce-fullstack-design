import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        if (sessionStorage.getItem('auth-token')) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        // Simple client‐side check
        if (!email.trim() || !password) {
            setError('Email and password are required.');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const json = await res.json();

            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('email', email);
                navigate('/');
            } else {
                // Collect all error messages
                if (json.errors && Array.isArray(json.errors)) {
                    setError(json.errors.map(err => err.msg).join(' • '));
                } else if (json.error) {
                    setError(json.error);
                } else {
                    setError('Login failed. Please try again.');
                }
            }
        } catch (err) {
            console.error('Login request failed:', err);
            setError('Network error. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setEmail('');
        setPassword('');
        setError('');
    };

    return (
        <div className="login-page">
            <div className="container">
                <div className="login-grid">
                    <div className="login-text">
                        <h2>Login</h2>
                    </div>

                    <div className="login-text">
                        Are you a new member?{' '}
                        <Link to="/Signup" className="signup-link">
                            Sign Up Here
                        </Link>
                    </div>

                    {error && <div className="login-error">{error}</div>}

                    <div className="login-form">
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <div className="btn-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary mb-2 mr-1"
                                    disabled={loading}
                                >
                                    {loading ? 'Logging in…' : 'Login'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger mb-2"
                                    onClick={handleReset}
                                    disabled={loading}
                                >
                                    Reset
                                </button>
                            </div>

                            <div className="login-text forgot-text">
                                Forgot Password?
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;