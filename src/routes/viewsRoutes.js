const express = require('express');
const router = express.Router();

const productsRoutes = require('./productsRoutes');

router.use('/products', productsRoutes);

module.exports = router;


