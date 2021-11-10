//const User = require('../models/user');
const db = require("../models");
const Article = db.articles;
const fs = require('fs');


// logique métier : lire tous les articles
exports.findAllArticle = (req, res, next) => {
  Article.findAll()
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
    const articleObject = req.body;
    // Création d'un nouvel objet Article à partir du modèle créé
    const article = new Article({
      //copie tous les champs de la requête de la variable articleObject
      ...articleObject,
      // Création lien articles ...

      // Création de l'URL de l'image : http://localhost:3000/images/nomdufichier 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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
    const articleObject = req.body
     /* Si il existe déjà une image
    {
      ...req.body,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };*/
      // Si il n'existe pas d'image
    Article.update({ where: {id: req.params.id}}, {...articleObject})
      .then(() => res.status(200).json({ message: 'Article modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };
  

  // logique métier : supprimer un article
  exports.deleteArticle = (req, res, next) => {
  //on supprime l'objet dans la base de données
  Article.destroy({ where: {id: req.params.id} })
  .then(() => res.status(200).json({ message: 'Article supprimé !'}))
  .catch(error => res.status(400).json({ error }));

    /*//trouver l'objet dans la base de données
    Article.findOne({ where: {id: req.params.id} })
      .then(article => {
        // Récupération du nom du fichier
        const filename = article.imageUrl.split('/images/')[1];
        // On efface le fichier (unlink)
        fs.unlink(`images/${filename}`, () => {
        });
      })
      .catch(error => res.status(500).json({ error }));*/
  };

