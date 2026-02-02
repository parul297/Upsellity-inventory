import express from 'express';
import {
    addProduct,
    getAllProducts,
    deleteProduct,
    getProductById,
    updateProduct
} from '../controllers/productControllers.js';

const router = express.Router();

router.get('/products', getAllProducts);
router.post('/products', addProduct);
router.get('/products/:id', getProductById);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
