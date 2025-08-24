import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Profile.css';

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [updatedDetails, setUpdatedDetails] = useState({ name: '', phone: '' });
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // 1) On mount, check auth token and fetch profile
    useEffect(() => {
        const token = sessionStorage.getItem('auth-token');
        if (!token) {
            navigate('/login');
        } else {
            fetchUserProfile(token);
        }
    }, [navigate]);

    // Fetch GET /api/auth/me
    const fetchUserProfile = async (token) => {
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${API_URL}/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.status === 401) {
                sessionStorage.removeItem('auth-token');
                navigate('/login');
                return;
            }
            if (!res.ok) {
                throw new Error('Failed to load profile');
            }

            const user = await res.json();
            setUserDetails(user);
            setUpdatedDetails({ name: user.name || '', phone: user.phone || '' });
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedDetails((prev) => ({ ...prev, [name]: value }));
    };

    // Submit PUT /api/auth/me
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const token = sessionStorage.getItem('auth-token');
        if (!token) {
            navigate('/login');
            return;
        }

        setSaving(true);

        try {
            const res = await fetch(`${API_URL}/api/auth/me`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedDetails)
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || 'Failed to update profile');
            }

            const updated = await res.json();
            setUserDetails(updated);
            sessionStorage.setItem('name', updated.name);
            sessionStorage.setItem('phone', updated.phone);
            setEditMode(false);
            alert('Profile updated successfully');
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="profile-container">
                <p>Loading profile…</p>
            </div>
        );
    }

    if (error && !editMode) {
        return (
            <div className="profile-container">
                <p style={{ color: 'red' }}>{error}</p>
            </div>
        );
    }

    return (
        <div className="profile-container">
            {!editMode ? (
                <div className="profile-details">
                    <h1>Welcome, {userDetails.name}</h1>
                    <p>
                        <strong>Email:</strong> {userDetails.email}
                    </p>
                    {userDetails.phone && (
                        <p>
                            <strong>Phone:</strong> {userDetails.phone}
                        </p>
                    )}
                    <button onClick={() => setEditMode(true)}>
                        Edit Profile
                    </button>
                </div>
            ) : (
                <form className="profile-form" onSubmit={handleSubmit}>
                    {error && <p className="profile-error">{error}</p>}

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={userDetails.email}
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={updatedDetails.name}
                            onChange={handleInputChange}
                            required
                            disabled={saving}
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={updatedDetails.phone}
                            onChange={handleInputChange}
                            pattern="\d{10}"
                            title="Must be 10 digits"
                            disabled={saving}
                        />
                    </div>

                    <div className="btn-group">
                        <button type="submit" disabled={saving}>
                            {saving ? 'Saving…' : 'Save'}
                        </button>
                        <button
                            type="button"
                            disabled={saving}
                            onClick={() => {
                                setError('');
                                setEditMode(false);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Profile;
