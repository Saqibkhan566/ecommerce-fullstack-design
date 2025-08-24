// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();

const app = express();

// Connect to MongoDB
await connectDB();

// Global middleware
app.use(helmet());
app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN || '*',
        credentials: true
    })
);
app.use(morgan('dev'));

// Rate limiter on all /api routes
app.use(
    '/api',
    rateLimit({
        windowMs: 60 * 1000, // 1 minute
        max: 120
    })
);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Centralized error handlers
// 1) Your custom errorHandler will format errors
app.use(errorHandler);

await connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);