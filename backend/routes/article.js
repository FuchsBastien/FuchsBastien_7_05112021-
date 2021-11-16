const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/article');
const commentCtrl = require('../controllers/comment');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


// Routes
//ici '/' pour /api/articles/ par défaut
router.get('/', articleCtrl.findAllArticle);
router.get('/:id', articleCtrl.findOneArticle); 
router.post('/', articleCtrl.createArticle);
router.put('/:id', articleCtrl.modifyArticle);
router.delete('/:id', articleCtrl.deleteArticle);

router.get('/:id/comments', commentCtrl.findCommentsByArticleId);

module.exports = router;


//api/articles/
//api/articles/:id
//api/articles/:id/comments

