const express = require('express');
const router = express.Router();
const realTimeProductsControllers = require('../controllers/realTimeProductsController');

router.get('/realtimeProducts', realTimeProductsControllers.getRealTimeProducts);
router.post('/realtimeProducts', realTimeProductsControllers.createRealTimeProduct);
router.delete('/realtimeProducts/:id', realTimeProductsControllers.deleteRealTimeProduct);

module.exports = router;