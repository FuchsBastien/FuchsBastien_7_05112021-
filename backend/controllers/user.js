//const User = require('../models/user');
const db = require("../models");
const User = db.users;

const fs = require('fs');


// logique métier : lire tous les utilisateurs
exports.findAllUser = (req, res, next) => {
  User.findAll()
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error }));
};


// logique métier : lire un utilisateur par son id
exports.findOneUser = (req, res, next) => {
  //afficher l'article par son ID récupéré dans l'url
  User.findOne({ where: {id: req.params.id} })
    .then(user => {console.log(user); res.status(200).json(user)})
    .catch(error => res.status(404).json({ error }));
};


// logique métier : modifier un utilisateur
exports.modifyUser = (req, res, next) => {
  const userObject = req.body
    // S'il existe déjà une image
   /*{
      ...JSON.parse(req.body.user),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };*/
   // S'il n'existe pas d'image
   User.update({ where: {id: req.params.id}}, { ...userObject})
    .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
    .catch(error => res.status(400).json({ error }));
};


// logique métier : supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
  //trouver l'utilisateur dans la base de données
  /*User.findOne({ where: {id: req.params.id} })
    .then(user => {
      // Récupération du nom du fichier
      const filename = user.imageUrl.split('/images/')[1];
      // On efface le fichier (unlink)
      fs.unlink(`images/${filename}`, () => {
       
        
      });
    })
    .catch(error => res.status(500).json({ error }));*/
  //on supprime l'utilisateur dans la base de données
  User.destroy({ where: {id: req.params.id} })
  .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
  .catch(error => res.status(400).json({ error }));

};


