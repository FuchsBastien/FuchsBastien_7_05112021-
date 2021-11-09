const express = require('express');
const path = require('path');
/*const cors = require("cors");*/

/*const mysql = require ('mysql2');
const Sequelize  = require('sequelize');*/

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
/*const articleRoutes = require('./routes/article')
const commentRoutes = require('./routes/comment')*/



const app = express ();



//Définition de headers pour éviters les erreurs de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


//fonction pour tout type de requête qui permet à l'application express d'envoyer une réponse en JSON
app.use(express.json());



// appel des models pour créer les tables dans la DB
const db = require("./models");
db.sequelize.sync();


// exemple route
app.get("/api/", (req, res) => {
  console.log("Welcome bastien's application.");
});


//Enregistrement des routeurs
/*app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/comments', commentRoutes);*/
app.use('/api/user', userRoutes);


// export de notre app
module.exports = app;






