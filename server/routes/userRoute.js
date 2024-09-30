const express = require('express');
const router = express.Router();
const { signup, login, logout } = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');
const { getUser } = require('../controllers/userController');
const { refreshToken } = require('../middlewares/refreshToken');



router.post('/signup', signup);

router.post('/login',login);
router.get('/users',verifyToken,getUser)
router.get('/refresh',refreshToken,verifyToken,getUser)
router.post('/logout',verifyToken,logout)

module.exports = router;