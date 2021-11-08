const jwt = require('jsonwebtoken');

// Validation userId en comparaison avec le token
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    //Si user ID de la requête différent user ID utilisateur
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valide!';
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error: new Error('Requête non authentifiée!!')
    });
  }
};

