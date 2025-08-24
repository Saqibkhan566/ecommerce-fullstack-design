import { useState } from 'react';

const AuthForm = ({ mode }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = mode === 'login' ? 'login' : 'register';
        const body = mode === 'login' ? { email, password } : { name, email, password };

        const res = await fetch(`http://localhost:5000/api/users/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        localStorage.setItem('token', data.token);
        alert(`${mode} successful`);
    };

    return (
        <form onSubmit={handleSubmit}>
            {mode === 'register' && <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />}
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
            <button type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
        </form>
    );
};

export default AuthForm;