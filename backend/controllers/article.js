const Sauce = require('../models/article');
const fs = require('fs');


//enregistrer nouvelle sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    //ID de le requête à supprimer car généré automatiquement par mongoDB
    delete sauceObject._id;
    // Création d'un nouvel objet Sauce à partir du modèle créé
    const sauce = new Sauce({
      //copie tous les champs de la requête de la variable sauceObject
      ...sauceObject,
      // Création de l'URL de l'image : http://localhost:3000/image/nomdufichier 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    // Enregistrement de l'objet sauce dans la base de données
    sauce.save()
      //réponse obligatoire sinon expiration de la requête
      .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
      //erreur si requête non envoyé au serveur
      .catch(error => res.status(400).json({ error }));
  };


//modifier sauce selectionnée
  exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
     // Si il existe déjà une image
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
      // Si il n'existe pas d'image
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(400).json({ error }));
  };
  

  //supprimer sauce selectionnée
  exports.deleteSauce = (req, res, next) => {
    //trouver l'objet dans la base de données
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        // Récupération du nom du fichier
        const filename = sauce.imageUrl.split('/images/')[1];
        // On efface le fichier (unlink)
        fs.unlink(`images/${filename}`, () => {
          //on supprime l'objet dans la base de données
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };


//afficher sauce selectionnée
  exports.getOneSauce = (req, res, next) => {
    //afficher la sauce par son ID récupéré dans l'url
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  };


//afficher toutes les sauces
  exports.getAllSauce = (req, res, next) => {
    Sauce.find()
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(400).json({ error }));
  };
  

