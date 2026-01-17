const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../middleware/authMiddleware'); // Middleware import karein
const categoryController = require('../controllers/Category');


// Sabhi routes ke beech mein 'verifyToken' add kar dijiye
router.get('/products', verifyToken, productController.getProducts);
router.post('/add', verifyToken, productController.addProduct);
router.put('/update/:id', verifyToken, productController.updateProduct);
router.delete('/delete/:id', verifyToken, productController.deleteProduct);



// Categories ke liye routes
router.get('/categories', categoryController.getCategories);
router.post('/categories/add', categoryController.addCategory);
// DELETE ROUTE YAHAN HONA CHAHIYE
router.delete('/categories/:id', categoryController.deleteCategory);


module.exports = router;