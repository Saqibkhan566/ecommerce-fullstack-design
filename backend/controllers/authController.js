// // backend/controllers/authController.js
// import asyncHandler from '../middleware/asyncHandler.js';
// import User from '../models/User.js';
// import jwt from 'jsonwebtoken';

// // @desc    Register a new user
// // @route   POST /api/auth/register
// // @access  Public
// export const registerUser = asyncHandler(async (req, res) => {
//     const { name, email, password } = req.body;
//     // …your existing registration logic (checking for existing user, hashing, etc.)…
//     const user = await User.create({ name, email, password });
//     // …generate token, return user…
//     res.status(201).json({
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
//     });
// });

// // @desc    Login user & get token
// // @route   POST /api/auth/login
// // @access  Public
// export const loginUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !(await user.matchPassword(password))) {
//         return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     res.json({
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
//     });
// });

// // @desc    Get current logged-in user
// // @route   GET /api/auth/me
// // @access  Private
// export const getMe = asyncHandler(async (req, res) => {
//     // protect middleware has already attached req.user
//     res.json({
//         id: req.user._id,
//         name: req.user.name,
//         email: req.user.email,
//         role: req.user.role
//     });
// });
// backend/controllers/authController.js

import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Utility to sign a JWT with 30d expiry
const signToken = (userId) =>
    jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // 1) Basic payload validation
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email and password are required.' });
    }

    // 2) Pre-check for existing email
    const existing = await User.findOne({ email });
    if (existing) {
        return res.status(400).json({ error: 'That email is already registered.' });
    }

    try {
        // 3) Create new user
        const user = await User.create({ name, email, password });

        // 4) Respond with authtoken (matching your front-end)
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            authtoken: signToken(user._id)
        });
    } catch (err) {
        // 5) Catch any duplicate-key that slipped through or other DB errors
        if (err.code === 11000 && err.keyPattern?.email) {
            return res.status(400).json({ error: 'That email is already registered.' });
        }

        console.error('Register error:', err);
        res.status(500).json({ error: 'An unexpected server error occurred.' });
    }
});

// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Return authtoken to front-end
    res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        authtoken: signToken(user._id)
    });
});

// @desc    Get current logged‐in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
    // protect middleware has attached req.user already
    const { _id, name, email, role } = req.user;
    res.json({ id: _id, name, email, role });
});