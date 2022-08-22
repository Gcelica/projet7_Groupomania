import "./formSignup.css";
import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ButtonLogin from "../../buttons/button-login/ButtonLogin";

function FormSignup() {
  const email = useRef(); //utlisation de useRef pour gagner un peu de vitesse de chargement
  const password = useRef();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    {
      const user = {
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("http://localhost:5500/api/users/signup", user);
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
          <form className="loginBox" onSubmit={handleSignup}>
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />

            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
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
