import ButtonLogin from "../../components/buttons/button-login/ButtonLogin";
import ButtonSignUp from "../../components/buttons/button-signup/ButtonSignUp";
import "./home.css";

function Home() {
  //const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="post">
      <div>
        <ButtonLogin />
        <br />
        <ButtonSignUp />
      </div>
      <div>
        <img
          className="logoImg"
          src=" http://localhost:5500/images/assets/logo/icon-left-font.png"
          alt="logo de Groupomania"
        />
      </div>
    </div>
  );
}

export default Home;
