const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/auth');

// Routes
//ici '/' pour /api/auth/ par défaut
router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);

module.exports = router;


//api/auth/
//api/auth/signup
//api/auth/login



