const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

const auth = require('../middleware/auth');

// Routes
//ici '/' pour /api/comments/ par défaut
router.post('/', auth, multer, commentCtrl.createComment);
router.delete('/:id', auth, commentCtrl.deleteComment);
router.get('/:id', auth, commentCtrl.getOneComment); 
router.get('/', auth, articleCtrl.getAllComment);


module.exports = router;


//api/comments/:id


