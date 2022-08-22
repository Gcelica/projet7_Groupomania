const bcrypt = require("bcrypt");

const User = require("../models/User");

const jwt = require("jsonwebtoken");

//middlewar nouvel utilisateur

//fonction pour enregistrer les nouveaux utilisateurs et crypter le mot de passe
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });

      //enregistrement de l'utlisateur dans la base de donnée
      user
        .save()
        .then(() => res.status(201).json({ message: "utilisateur crée" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//middleware connection

//fonction pour connecter les utlisateurs existants
exports.login = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: "Utilisateur non trouvé !",
        });
      }
      //bcrypt compare les hashs(issue du meme string d'origine)
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: "Mot de passe incorrect !",
            });
          }
          res.status(200).json({
            name: user.name,
            userId: user._id,
            isAdmin: user.isAdmin,
            token: jwt.sign(
              { userId: user._id, isAdmin: user.isAdmin },
              process.env.TOKEN_JWT,
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) =>
          res.status(500).json({
            error,
          })
        );
    })
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};

//supprimer un compte utlisateur

exports.deleteUser = async (req, res) => {
  User.findOne({
    _id: req.body.userId,
  });
  if (req.body.userId === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("le compte à été supprimé");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("Vous ne pouvez pas supprimer ce compte!");
  }
};
