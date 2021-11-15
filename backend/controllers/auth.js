//const User = require('../models/user');
const db = require("../models");
const User = db.users;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Logiques métiers pour les utilisateurs
// Création de nouveaux utilisateurs (signup)
exports.signup = (req, res, next) => {

   // éléments de la requète
   const firstname = req.body.firstname;
   const lastname =  req.body.lastname;
   const email = req.body.email;
   const password = req.body.password;

  //champs obligatoire
  if (firstname === null || firstname === '' || lastname === null || lastname === '' || email === null ||
  email === '' || password === null || password === '') {
  return res.status(400).json({'error': "Veuillez remplir l'ensemble des champs du formulaire"});
  }


  User.findOne({ where: { email: req.body.email }})
    .then(userFound => {
      // Si on ne trouve pas l'utilisateur
      if (!userFound) {
      // Hash du mot de passe avec bcrypt (fonction asynchrone)
        bcrypt.hash(password, 10)
        .then(hash => {
          //création nouvel utilisateur
          const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash
          });
          // Sauvegarde dans la base de données
         user.save()
         .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
         .catch(error => res.status(400).json({ error }));
       })   
     }
     else if (userFound) {
     return res.status(409).json({error: "Adresse mail existe déjà !"})
     }

   })
  .catch(error => res.status(500).json({message: 'requête échouée' }));
}


// Création de connexion d'utilisateur enregistré (login)
exports.login = (req, res, next) => {
    // Recherche d'un utilisateur dans la base de données
    User.findOne({ where: { email: req.body.email }})
      .then(user => {
        // Si on ne trouve pas l'utilisateur
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
         // On compare le mot de passe de la requête avec celui de la base de données
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            //si mot de passe différent
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
              //si même mot de passe
            res.status(200).json({
              userId: user.id,
               // Création d'un token pour sécuriser le compte de l'utilisateur
              token: jwt.sign(
                { userId: user.id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };




  