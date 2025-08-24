// backend/models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, index: true },
        description: { type: String, default: '' },
        category: { type: String, required: true, index: true },
        price: { type: Number, required: true, min: 0 },
        brand: { type: String, default: '' },
        image: { type: String, default: '' },
        stock: { type: Number, default: 0 },
        rating: { type: Number, default: 0 },
        numReviews: { type: Number, default: 0 }
    },
    { timestamps: true }
);

// Text index for full-text search
productSchema.index({ name: 'text', description: 'text' });

export default mongoose.model('Product', productSchema);