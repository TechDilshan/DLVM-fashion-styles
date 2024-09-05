const express = require('express');
const router_U = express.Router();  // Create a router instance
const controller = require('../controllers/CartController');

router_U.post('/createcart', controller.createCart); // Route to create a new cart item
router_U.get('/getcart', controller.getCart);
router_U.post('/updatecart', controller.updateCart);
router_U.post('/deletecart', controller.deleteCart);

module.exports = router_U;