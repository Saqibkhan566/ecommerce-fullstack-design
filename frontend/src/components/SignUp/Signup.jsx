import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Signup.css';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
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

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        // basic client-side check
        if (!name || !email || !phone || !password) {
            setError('All fields are required.');
            return;
        }

        setLoading(true);

        const payload = { name, email, phone, password };
        console.log('Register payload:', payload);

        try {
            const res = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            // if status is 4xx or 5xx, read the message and throw
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || res.statusText);
            }

            const json = await res.json();
            console.log('Register response:', json);

            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', name);
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('phone', phone);
                navigate('/');
            } else {
                // unlikely if res.ok, but handle gracefully
                throw new Error(json.error || 'Registration failed');
            }
        } catch (err) {
            console.error('Registration error:', err);
            // surface only the message (which may be your server’s stack trace or custom msg)
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setError('');
    };

    return (
        <div className="signup-page">
            <div className="container">
                <div className="signup-grid">
                    <div className="signup-header">
                        <h1>Sign Up</h1>
                    </div>

                    <div className="signup-text">
                        Already a member?{' '}
                        <Link to="/Login" className="signup-link">
                            Login
                        </Link>
                    </div>

                    {error && <div className="signup-error">{error}</div>}

                    <form className="signup-form" onSubmit={handleRegister}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                id="name" type="text" className="form-control"
                                value={name} onChange={e => setName(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                id="phone" type="tel" className="form-control"
                                value={phone} onChange={e => setPhone(e.target.value)}
                                pattern="\d{11}" title="11 digits"
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email" type="email" className="form-control"
                                value={email} onChange={e => setEmail(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password" type="password" className="form-control"
                                value={password} onChange={e => setPassword(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <div className="btn-group">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Submitting…' : 'Submit'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleReset}
                                disabled={loading}
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;