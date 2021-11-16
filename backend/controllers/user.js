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
  //afficher l'utilisateur par son ID récupéré dans l'url
  User.findOne ({ where: {id: req.params.id} })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
};


// logique métier : modifier un utilisateur
exports.modifyUser = (req, res, next) => {
   // éléments de la requète
   const firstname = req.body.firstname;
   const lastname =  req.body.lastname;
   // vérification que tous les champs sont remplis
   if(firstname === null || firstname === '' || lastname === null ||lastname === '') 
   { return res.status(400).json({'error': "Les champs 'nom' et 'prénom' doivent être remplis "});}
   // S'il existe déjà une image
  const userObject = req.file ?
   { ...JSON.parse(req.body.user),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   } : { ...req.body };
   // S'il n'existe pas d'image (ATTENTION : mettre userObject avant where)
   User.update({ ...userObject, id:  req.params.id}, { where: {id: req.params.id} })
    .then(() => res.status(200).json({ message: 'Utilisateur modifié !'}))
    .catch(error => res.status(400).json({ error }));
};


// logique métier : supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
  //trouver l'utilisateur dans la base de données
  User.findOne ({ where: {id: req.params.id} })
    .then(user => {
      // Récupération du nom du fichier
      const filename = user.imageUrl;
      // On efface le fichier (unlink)
      fs.unlink(`images/${filename}`, () => {
      //on supprime l'utilisateur dans la base de données
        User.destroy({ where: {id: req.params.id} })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
        .catch(error => res.status(400).json({ error }));  
      });
    })
    .catch(error => res.status(500).json({ error }));
   
};


