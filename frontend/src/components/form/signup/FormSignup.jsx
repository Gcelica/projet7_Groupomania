import "./formSignup.css";
import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ButtonLogin from "../../buttons/button-login/ButtonLogin";

function FormSignup() {
  const email = useRef(); //utlisation de useRef pour gagner un peu de vitesse de chargement
  const password = useRef();
  const name = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Mot de passe pas identique!");
    } else {
      const user = {
        email: email.current.value,
        password: password.current.value,
        name: name.current.value,
      };
      try {
        await axios.post("http://localhost:5500/api/users/signup", user);
        alert("compte crée !");
        navigate("/Login");
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

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
          <form className="loginBox2" onSubmit={handleSignup}>
            <input
              placeholder="Nom"
              required
              ref={name}
              className="loginInput"
            />

            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />

            <input
              placeholder="Mot de passe"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="valider mot de passe"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginRegisterButton" type="submit">
              Créer nouveau compte
            </button>
            <div>
              <ButtonLogin />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default FormSignup;
