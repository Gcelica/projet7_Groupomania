import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Feed from "./pages/feed/Feed";
import PagePost from "./pages/post/PagePost";
import Edit from "./pages/edit/Edit";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const userId = localStorage.getItem("userId");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={userId ? <Feed /> : <Home />} />
        <Route
          path="/feed/newPost"
          element={userId ? <PagePost /> : <Home />}
        />
        <Route path="/feed/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;

/*<Route path="/" element={user ? <Home /> : <Login />} />
Si l'utlisateur est connecté on peut aller sur la page d'acceuil si non c'est 
la page Login qui s'affiche. Meme methode pour la page Profile.
*/
//<Route path="/" element={user ? <Edit /> : <Login />} />
