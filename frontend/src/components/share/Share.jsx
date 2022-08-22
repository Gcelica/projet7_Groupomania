import "./share.css";
import { PermMedia, Cancel } from "@mui/icons-material";
import axios from "axios";

import { useState } from "react";

function Share() {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [preview, setPreview] = useState("");

  const imageChange = (e) => {
    const [file] = e.target.files;
    setPreview(URL.createObjectURL(file));
    setImage(e.target.files[0]);
  };

  function newPost() {
    const nameData = name;
    const formData = new FormData();
    formData.append("post", desc);
    formData.append("image", image);
    formData.append("name", nameData);

    axios({
      method: "POST",
      url: "http://localhost:5500/api/posts",
      data: formData,

      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        alert("votre post a été publié");
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
            type="button"
            value="Partager"
            onClick={newPost}
          ></input>
        </div>
      </div>
    </form>
  );
}

export default Share;
