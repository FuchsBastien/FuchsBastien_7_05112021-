const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
/*const articleCtrl = require('../controllers/article');*/

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


// Routes
//ici '/' pour /api/user/ par défaut
router.get('/', userCtrl.findAllUser);
router.get('/:id', userCtrl.findOneUser);
router.put('/:id', multer, userCtrl.modifyUser);
router.delete('/:id', userCtrl.deleteUser);

/*router.get('/:id/articles', articleCtrl.findArticlesByUserId);*/

module.exports = router;


//api/user/
//api/user/:id
//api/user/:id/article