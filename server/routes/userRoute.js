const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');
const { getUser } = require('../controllers/userController');



router.post('/signup', signup);

router.post('/login',login);
router.get('/users',verifyToken,getUser)

module.exports = router;