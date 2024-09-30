import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AuthContext from "./context/AuthContext";
import { useState } from "react";

function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  
  
  return (
    <>
      <AuthContext.Provider value={{isAuth, setIsAuth, user, setUser}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
