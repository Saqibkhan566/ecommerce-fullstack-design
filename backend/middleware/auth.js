// middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes (now async to allow await)
export async function protect(req, res, next) {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null;

    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        // Verify token and load user
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User
            .findById(decoded.id)
            .select('-password');

        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token invalid' });
    }
}

// Restrict to specific roles
export function authorize(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
}