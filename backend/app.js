const express = require('express');
const path = require('path');
const mysql = require ('mysql2');
const Sequelize  = require('sequelize');

/*const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const articleRoutes = require('./routes/article')
const commentRoutes = require('./routes/comment')*/



// connexion à DB mySQL avec l'ORM sequelize
const sequelize = new Sequelize({ 
  username: "root",
  password: "shogun99",
  database: "groupomania",
  host :'localhost',
  dialect: "mysql",  
  
  });


//test connexion mySQL
  try {
    sequelize.authenticate();
    console.log('Connecté à la base de données MySQL!');
    sequelize.query('SELECT * FROM User').then(([results, metadata]) => {
      console.log(results);
    })
  } 
  catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error);
  }


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


//Enregistrement des routeurs
/*app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/comments', commentRoutes);*/


// export de notre app
module.exports = app;




//connection mysql
/*const connexion = mysql.createConnection({
    host :'localhost',
    user : 'root',
    password : 'shogun99',
    database : 'groupomania',
});*/


/*connexion.connect((err) => {
  if(err)
  console.log(err); 
  else
  console.log('connexion à MySQL réussie!');
});*/







