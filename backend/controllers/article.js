//const User = require('../models/article');
const db = require("../models");
const Article = db.articles;

const fs = require('fs');


// logique métier : lire tous les articles
exports.findAllArticle = (req, res, next) => {
  Article.findAll(
    {order: [['createdAt', 'DESC'],]}
  )
    .then(article => res.status(200).json(article))
    .catch(error => res.status(400).json({ error }));
};


// logique métier : lire tous les articles de l'utilisateur
exports.findArticlesByUserId = (req, res, next) => {
  Article.findAll({
    where: {userId: req.params.id},
    order: [['createdAt', 'DESC'],]
  })
  .then(article => res.status(200).json(article))
  .catch(error => res.status(400).json({ error }));
};


// logique métier : lire un article par son id
exports.findOneArticle = (req, res, next) => {
  //afficher l'article par son ID récupéré dans l'url
  Article.findOne ({ where: {id: req.params.id} })
    .then(article => res.status(200).json(article))
    .catch(error => res.status(404).json({ error }));
};


// logique métier : créer un article
exports.createArticle = (req, res, next) => {
  // éléments de la requète
  const title = req.body.title;
  const content =  req.body.content;

  // vérification que tous les champs sont remplis
  if(title === null || title === '' || content === null || content === '') {
      return res.status(400).json({'error': "Veuillez remplir les champs 'titre' et 'contenu' pour créer un article"});
  }
  //variable contenant les champs de la requête
  const articleObject = req.body;

  // Création d'un nouvel objet Article à partir du modèle Article créé
  const article = new Article({
    //copie tous les champs de la requête de la variable articleObject
    ...articleObject,
    /* Création de l'URL de l'image : http://localhost:3000/images/nomdufichier 
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`*/
  });
  // Enregistrement de l'objet article dans la base de données
  article.save()
    //réponse obligatoire sinon expiration de la requête
    .then(() => res.status(201).json({ message: 'Article enregistré !'}))
    //erreur si requête non envoyé au serveur
    .catch(error => res.status(400).json({ error }));
};


// logique métier : modifier un article
exports.modifyArticle = (req, res, next) => {
  // éléments de la requète
  const title = req.body.title;
  const content =  req.body.content;
  // vérification que tous les champs sont remplis
  if(title === null || title === '' || content === null || content === '') {
      return res.status(400).json({'error': "Veuillez remplir les champs 'Titre' et 'Contenu' pour créer un article"});
  }
  const articleObject = req.body;
    // S'il existe déjà une image
  /*{ ...req.body,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };*/
   // S'il n'existe pas d'image (ATTENTION : mettre userObject avant where)
   Article.update({ ...articleObject, id:  req.params.id},{ where: {id: req.params.id}})
    .then(() => res.status(200).json({ message: 'Article modifié !'}))
    .catch(error => res.status(400).json({ error }));
};
  

  // logique métier : supprimer un article
  exports.deleteArticle = (req, res, next) => {
    //trouver l'article dans la base de données
    /*Article.findOne({ where: {id: req.params.id} })
      .then(article => {
        // Récupération du nom du fichier
        const filename = article.imageUrl.split('/images/')[1];
        // On efface le fichier (unlink)
        fs.unlink(`images/${filename}`, () => {

          
        });
      })
      .catch(error => res.status(500).json({ error }));*/
    //on supprime l'objet dans la base de données
    Article.destroy({ where: {id: req.params.id} })
    .then(() => res.status(200).json({ message: 'Article supprimé !'}))
    .catch(error => res.status(400).json({ error }));
  };

