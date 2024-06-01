const express = require('express');
const { getProducts, getProductDetails } = require('../controllers/productController');

const router = express.Router();

router.get('/:categoryname/products', getProducts);
router.get('/:categoryname/products/:productid', getProductDetails);

module.exports = router;
