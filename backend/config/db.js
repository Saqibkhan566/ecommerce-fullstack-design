// backend/config/db.js
import mongoose from 'mongoose';

async function connectDB() {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error('MONGO_URI not defined');
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('MongoDB connected');
}

export default connectDB;