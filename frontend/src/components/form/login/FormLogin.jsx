import "./formLogin.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function logUser() {
    const validEmail = new RegExp(
      "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
    );
    const validPassword = new RegExp(/^[a-zA-Z0-9]{6,}$/);

    if (validEmail.test(email) && validPassword.test(password)) {
      var user = {
        email: email,
        password: password,
      };
      console.log(user);
      axios
        .post("http://localhost:5500/api/users/login", user)

        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("email", email);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("isAdmin", res.data.isAdmin);
          navigate("/feed");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          alert("Email ou mot de passe incorrecte");
        });
    } else {
      alert(
        "veuillez renseigner un email valide et un mot de passe de 6 caracteres minimum"
      );
    }
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <img
            src="/assets/logo/icon-left-font-monochrome-black.png"
            alt="Logo Groupomania"
            className="loginLogo"
          />
        </div>
        <div className="loginRight">
          <form className="loginBox">
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="button"
              className="loginButton"
              value="Connexion"
              onClick={logUser}
            ></input>

            <nav>
              <Link to="/Signup">
                <button className="loginRegisterButton">
                  Créer un nouveau compte
                </button>
              </Link>
            </nav>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;
