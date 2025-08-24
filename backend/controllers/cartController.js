// backend/controllers/cartController.js
import asyncHandler from '../middleware/asyncHandler.js';
import Cart from '../models/Cart.js';  // adjust path/model name as needed

// @desc    Get current user's cart
// @route   GET /api/cart
// @access  Private
export const getCart = asyncHandler(async (req, res) => {
    // e.g. find or create a cart for req.user._id
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
        return res.json({ items: [] });
    }
    res.json(cart);
});

// @desc    Add an item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity = 1 } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
        cart = await Cart.create({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(i => i.product.equals(productId));
    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(201).json(cart);
});

// @desc    Update quantity of a cart item
// @route   PUT /api/cart/:itemId
// @access  Private
export const updateCartItem = asyncHandler(async (req, res) => {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.quantity = quantity;
    await cart.save();
    res.json(cart);
});

// @desc    Remove an item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
export const removeFromCart = asyncHandler(async (req, res) => {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items.id(itemId).remove();
    await cart.save();
    res.status(204).send();
});