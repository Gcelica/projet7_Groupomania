// importer token d'authentification
const jwt = require("jsonwebtoken");
require("dotenv").config();

// middleware d'authentification
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // récupération du token
    const decodedToken = jwt.verify(token, process.env.TOKEN_JWT); // décoder le token
    const userId = decodedToken.userId; // récupération du userID
    const admin = decodedToken.isAdmin;
    req.auth = { userId: userId, isAdmin: admin };
    if (req.body.userId && req.body.userId !== userId && !admin) {
      // vérifier si userID correspond au token
      throw "l'utilisateur n'es pas valide";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("La requête n'est pas valide!"),
    });
  }
};
