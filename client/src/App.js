import React, { useEffect, useContext } from "react";
import "./App.css";
import Navbar from "./views/Navbar/Navbar";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";
import Profile from "./views/Profile/Profile";
import ErrorPage from "./views/ErrorPage/ErrorPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./utils/userContext";

function App() {
  const { user, setUser } = useContext(AuthContext);
  console.log(user);
  useEffect(() => {
    const retriveUser = JSON.parse(localStorage.getItem("user"));
    setUser(retriveUser);
  }, [setUser]);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
