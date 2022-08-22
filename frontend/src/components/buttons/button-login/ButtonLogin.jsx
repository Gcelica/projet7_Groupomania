import "./buttonLogin.css";
import { Link } from "react-router-dom";

function ButtonLogin() {
  return (
    <nav>
      <Link to="/Login">
        <button className="loginButton">Se connecter</button>
      </Link>
    </nav>
  );
}

export default ButtonLogin;
