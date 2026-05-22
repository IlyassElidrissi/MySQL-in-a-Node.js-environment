const express = require('express');
const NoSQLcontroller = require('../controllers/NoSQLcontroller');
const SQLcontroller = require('../controllers/SQLcontroller');

const router = express.Router();

router.post('/nosql/products', NoSQLcontroller.createProduct);
router.get('/nosql/products', NoSQLcontroller.getProducts);
router.get('/nosql/products/:id', NoSQLcontroller.getProductById);
router.put('/nosql/products/:id', NoSQLcontroller.updateProduct);
router.delete('/nosql/products/:id', NoSQLcontroller.deleteProduct);

router.post('/sql/products', SQLcontroller.createProduct);
router.get('/sql/products', SQLcontroller.getProducts);
router.get('/sql/products/:id', SQLcontroller.getProductById);
router.put('/sql/products/:id', SQLcontroller.updateProduct);
router.delete('/sql/products/:id', SQLcontroller.deleteProduct);

module.exports = router;
