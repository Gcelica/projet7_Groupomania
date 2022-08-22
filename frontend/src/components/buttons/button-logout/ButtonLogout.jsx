import { Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";

function ButtonLogout() {
  const logOut = () => {
    localStorage.clear();
  };

  return (
    <nav>
      <Link className="topbarLink" onClick={logOut} to="/login">
        <Logout />
      </Link>
    </nav>
  );
}
export default ButtonLogout;
