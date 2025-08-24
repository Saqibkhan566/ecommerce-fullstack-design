// controllers/productController.js
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/Product.js';

// GET /api/products
export const getProducts = asyncHandler(async (req, res) => {
    const {
        search = '',
        category = '',
        maxPrice,
        minPrice,
        sort = 'createdAt',
        order = 'desc',
        page = 1,
        limit = 12
    } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let query = Product.find(filter);

    if (search.trim()) {
        // this will throw unless you have a text index on name+description
        query = Product.find(
            { $text: { $search: search }, ...filter },
            { score: { $meta: 'textScore' } }
        ).sort({ score: { $meta: 'textScore' } });
    }

    const pageNum = Math.max(1, Number(page));
    const perPage = Math.min(100, Math.max(1, Number(limit)));
    const sortDir = order === 'asc' ? 1 : -1;

    const total = await Product.countDocuments(
        search.trim()
            ? { $text: { $search: search }, ...filter }
            : filter
    );

    const products = await query
        .sort(search.trim() ? undefined : { [sort]: sortDir })
        .skip((pageNum - 1) * perPage)
        .limit(perPage)
        .lean();

    res.json({
        data: products,
        pagination: {
            total,
            page: pageNum,
            pages: Math.ceil(total / perPage),
            limit: perPage
        }
    });
});

// GET /api/products/:id
export const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

// POST /api/products   (admin only)
export const createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
});

// PUT /api/products/:id  (admin only)
export const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

// DELETE /api/products/:id  (admin only)
export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(204).send();
});