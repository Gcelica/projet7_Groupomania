import "./topBar.css";
import ButtonLogout from "../buttons/button-logout/ButtonLogout";

import { Link } from "react-router-dom";
import ButtonNewPost from "../buttons/button-newpost/ButtonNewPost";

function TopBar() {
  const name = localStorage.getItem("name");
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link className="topbarLink" to="/feed">
          <img
            src="http://localhost:5500/images/assets/logo/icon-left-font-monochrome-black.svg"
            alt="logo de Groupomania"
            className="logo"
          />
        </Link>
      </div>

      <div className="topbarRight">
        <h2 className="currentUser">{name}</h2>
        <ButtonNewPost />
        <ButtonLogout />
      </div>
    </div>
  );
}

export default TopBar;
