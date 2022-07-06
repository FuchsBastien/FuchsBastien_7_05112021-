const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/like');


// Routes
//ici '/' pour /api/likes/ 
router.get('/:id', likeCtrl.findLikeByArticle);
router.post('/', likeCtrl.createLikeByArticle);
router.delete('/:id', likeCtrl.deleteLikeByArticle);

module.exports = router;


//api/likes/:id
