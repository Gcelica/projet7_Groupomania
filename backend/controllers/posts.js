const fs = require("fs");
const Post = require("../models/Post");
const User = require("../models/User");

//creer un post

exports.createPost = (req, res, next) => {
  const desc = req.body.post;
  const name = req.body.name;
  const post = new Post({
    userId: req.auth.userId,
    name: name,
    desc: desc,
  });

  if (req.file) {
    post.imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }
  post
    .save()
    .then(() => res.status(201).json({ message: "votre post à été partagé" }))
    .catch((error) => res.status(400).json({ error }));
};

//modification d'un post

exports.modifyPost = (req, res, next) => {
  const desc = req.body.desc;
  const post = {
    desc: desc,
  };
  if (req.body.userId === req.auth.userId || req.auth.isAdmin === true) {
    if (req.file) {
      post.imageUrl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }
    Post.updateOne({ _id: req.params.id }, { ...post, _id: req.params.id })
      .then(() => res.status(200).json({ message: "Post modifié" }))
      .catch((error) => res.status(404).json({ error }));
  }
};

// Récupération d'un post

exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }) //comparaison meme id dans la requete que dans la base de données
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

// Récupération de tous les posts d'un utilisateur

exports.getAllPosts = (req, res, next) => {
  Post.find() //liste de tous les posts de la base de donées
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error }));
};

//supprimer un post

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId === req.auth.userId || req.auth.isAdmin === true) {
        if (post.imageUrl) {
          const filename = post.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            Post.deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json({ message: "Post supprimé !" }))
              .catch((error) => res.status(400).json({ error }));
          });
        } else {
          Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Post supprimé !" }))
            .catch((error) => res.status(400).json({ error }));
        }
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// like et dislike

exports.likeDislike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("le post a été liké");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("le post a été disliké");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
