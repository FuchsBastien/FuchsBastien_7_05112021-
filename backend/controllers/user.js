//const User = require('../models/user');
const db = require("../models");
const User = db.users;
const fs = require('fs');


// logique métier : lire tous les utilisateurs
exports.findAllUser = (req, res, next) => {
  User.findAll()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
};


// logique métier : lire un utilisateur par son id
exports.findOneUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
  .then(user => {
    console.log(user);
    res.status(200).json(user)
  })
  .catch(error => res.status(404).json({ error }));
};


// logique métier : modifier un utilisateur
exports.modifyUser = (req, res, next) => {
  const userObject = req.file ?
    // S'il existe déjà une image
    {
      ...JSON.parse(req.body.user),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }; 
    // S'il n'existe pas d'image
    User.update({ _id: req.params.id }, { ...userObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
      .catch(error => res.status(400).json({ error }));
};


// logique métier : supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
  //trouver l'utilisateur dans la base de données
  User.findOne({_id: req.params.id})
    .then(user => {
      // Récupération du nom du fichier
      const filename = user.imageUrl.split('/images/')[1];
      // On efface le fichier (unlink)
      fs.unlink(`images/${filename}`, () => {
        //on supprime l'utilisateur dans la base de données
        User.destroy({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
        .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};



/*exports.getAllUser = (req, res, next) => {
  User.findAll()
  .then(users => {
      console.log(users);
      res.status(200).json({ data: users});
  })
  .catch(err => {
    res.status(500).send({ message:err.message || "Some error occurred while retrieving tutorials."
    });
  });
};*/
