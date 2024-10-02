const express = require('express');
const router_U = express.Router();  
const controller_U = require('../controllers/FeedbackController');

router_U.post('/createmessage', controller_U.createMessage); 
router_U.get('/getmessage', controller_U.getMessage);
router_U.post('/updatemessage', controller_U.updateMessage);
router_U.post('/deletemessage', controller_U.deleteMessage);

module.exports = router_U;