const express = require('express');
const router = express.Router();

const articleCtrl = require('../controllers/article');
const commentCtrl = require('../controllers/comment');

const auth = require('../middleware/auth');


// Routes
//ici '/' pour /api/articles/ par défaut
router.post('/', auth, articleCtrl.createArticle);
router.put('/:id', auth, articleCtrl.modifyArticle);
router.delete('/:id', auth, articleCtrl.deleteArticle);
router.get('/:id', auth, articleCtrl.getOneArticle); 
router.get('/', auth, articleCtrl.getAllArticle);

router.get('/:id/comments', auth, commentCtrl.getAllComment);

router.get('/:id/likes', auth, likeCtrl.getAllLike);


module.exports = router;


//api/articles/
//api/articles/:id
//api/articles/:id/comments

