//const User = require('../models/user');
const db = require("../models");
const Article = db.articles;
const fs = require('fs');


// logique métier : lire tous les articles
exports.getAllArticle = (req, res, next) => {
  Article.find()
    .then(article => res.status(200).json(article))
    .catch(error => res.status(400).json({ error }));
};


// logique métier : lire un article par son id
exports.getOneArticle = (req, res, next) => {
  //afficher l'article par son ID récupéré dans l'url
  Article.findOne({ _id: req.params.id })
    .then(article => res.status(200).json(article))
    .catch(error => res.status(404).json({ error }));
};


// logique métier : enregistrer un article
exports.createArticle = (req, res, next) => {
    const articleObject = JSON.parse(req.body.article);
    //ID de le requête à supprimer car généré automatiquement par mongoDB
    delete articleObject._id;
    // Création d'un nouvel objet Article à partir du modèle créé
    const article = new Article({
      //copie tous les champs de la requête de la variable articleObject
      ...articleObject,
      // Création de l'URL de l'image : http://localhost:3000/image/nomdufichier 
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
    const articleObject = req.file ?
     // Si il existe déjà une image
    {
      ...JSON.parse(req.body.article),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
      // Si il n'existe pas d'image
    Article.updateOne({ _id: req.params.id }, { ...articleObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Article modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };
  

  // logique métier : supprimer un article
  exports.deleteArticle = (req, res, next) => {
    //trouver l'objet dans la base de données
    Article.findOne({ _id: req.params.id })
      .then(article => {
        // Récupération du nom du fichier
        const filename = article.imageUrl.split('/images/')[1];
        // On efface le fichier (unlink)
        fs.unlink(`images/${filename}`, () => {
          //on supprime l'objet dans la base de données
          Article.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Article supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

