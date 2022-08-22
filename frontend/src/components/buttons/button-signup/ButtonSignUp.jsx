import "./buttonSignUp.css";
import { Link } from "react-router-dom";

function ButtonSignUp() {
  return (
    <nav>
      <Link to="/Signup">
        <button className="loginButton">Créer un nouveau compte</button>
      </Link>
    </nav>
  );
}

export default ButtonSignUp;
