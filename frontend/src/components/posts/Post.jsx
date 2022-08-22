import "./post.css";

import { useState, useEffect } from "react";
import axios from "axios";

import { format } from "date-fns";

function Post() {
  const isAdmin = localStorage.getItem("isAdmin");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  //const name = localStorage.getItem("name");

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [posts, setPosts] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [like, setLike] = useState([]);

  const getPosts = () => {
    axios({
      method: "GET",
      url: "http://localhost:5500/api/posts/",
      headers: { Authorization: "Bearer " + token },
    }).then((res) => {
      setPosts(
        res.data.sort((p1, p2) => {
          //.sort() permet de definir l'ordre de tri
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    });
  };

  const likeHandler = async (id, likes) => {
    console.log(id, likes);

    await axios
      .put(
        " http://localhost:5500/api/posts/" + id + "/like",
        { likes, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editPost = (id) => {
    window.location.href = `/feed/${id}`;
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:5500/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        getPosts();
        alert("message supprimé");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPosts();

    // eslint-disable-next-line
  }, [isLiked]);

  return (
    <div>
      {posts.map((post) => {
        return (
          <div className="post" key={post._id}>
            <div className="postWrapper">
              <div className="postTop">
                <div className="postTopLeft">
                  <span className="postUsername">{post.name} dit :</span>
                </div>
                <div className="postTopRight">
                  <span className="postDate">
                    {format(new Date(post.createdAt), "HH:mm:ss - dd/MM/yyyy")}
                  </span>
                </div>
              </div>
              <div className="postCenter">
                <span className="postText">{post.desc}</span>
                <img
                  className="postImg"
                  src={post.imageUrl}
                  alt="publication utilisateur"
                />
              </div>
              <div className="postBottom">
                <div className="postBottomLeft">
                  <img
                    className="likeIcon"
                    src={`${PF}assets/like.png`}
                    onClick={() => likeHandler(post._id, post.likes)}
                    alt="pastille d'un pouce qui pointe vers le haut"
                  />

                  <span className="postLikeCounter">
                    {post.likes.length} j'aime !
                  </span>
                </div>
                <div className="postBottomRight">
                  {(post.userId === userId || isAdmin === "true") && (
                    <>
                      <button
                        className="editButton"
                        onClick={() => editPost(post._id)}
                      >
                        modifier
                      </button>
                      <button
                        className="editButton"
                        onClick={() => deletePost(post._id)}
                      >
                        supprimer
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Post;
