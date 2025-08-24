// routes/productRoutes.js
import { Router } from 'express';
import {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected admin routes
router.post('/', protect, authorize('admin'), createProduct);
router.put('/:id', protect, authorize('admin'), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

export default router;