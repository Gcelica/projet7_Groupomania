import "./editPost.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { PermMedia, Cancel } from "@mui/icons-material";
import { useParams } from "react-router-dom";

export default function EditPost() {
  const token = localStorage.getItem("token");
  const postData = useParams();
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5500/api/posts/${postData.id}`,
      headers: { Authorization: "Bearer " + token },
    }).then((res) => {
      setDesc(res.data.desc);
      setUserId(res.data.userId);
      setPreview(res.data.imageUrl);
    });
    // eslint-disable-next-line
  }, []);

  const imageChange = (e) => {
    const [file] = e.target.files;
    setPreview(URL.createObjectURL(file));
    setImage(e.target.files[0]);
  };

  function editPost() {
    const formData = new FormData();
    formData.append("image", image);
    console.log(image);
    formData.append("desc", desc);
    formData.append("userId", userId);

    axios({
      method: "PUT",
      url: `http://localhost:5500/api/posts/${postData.id}`,
      data: formData,
      userId,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        alert("votre post a été modifié");
        //window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <form className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <br />
          <input
            placeholder={"Quoi de neuf ?"}
            className="shareInput"
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        {image && (
          <div className="shareImgContainer">
            <img className="shareImg" src={preview} alt="preview" />
            <Cancel className="shareCancelImg" onClick={() => setImage(null)} />
          </div>
        )}
        <div className="shareBottom">
          <div className="shareOptions">
            <label className="shareOption">
              <PermMedia htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Photo</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="image"
                accept=".png,.jpeg,.jpg"
                onChange={imageChange}
              />
            </label>
          </div>
          <input
            className="shareButton"
            type="submit"
            value="Partager"
            onClick={editPost}
          ></input>
        </div>
      </div>
    </form>
  );
}
