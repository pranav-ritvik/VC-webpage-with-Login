// src/App.js
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import { startVoiceRecognition, stopVoiceRecognition } from "./voiceCommands";
import "./App.css";

const App = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!user);

    if (isListening) {
      startVoiceRecognition(navigate, isLoggedIn);
    } else {
      stopVoiceRecognition();
    }

    return () => {
      stopVoiceRecognition();
    };
  }, [isListening, navigate, isLoggedIn]);

  const toggleListening = () => {
    setIsListening((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div id="app-root">
      {isLoggedIn && (
        <Navbar isAuthenticated={isLoggedIn} onLogout={handleLogout} />
      )}
      <button onClick={toggleListening} className="mic-button">
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/about"
          element={isLoggedIn ? <About /> : <Navigate to="/login" />}
        />
        <Route
          path="/contact"
          element={isLoggedIn ? <Contact /> : <Navigate to="/login" />}
        />
        <Route
          path="/services"
          element={isLoggedIn ? <Services /> : <Navigate to="/login" />}
        />
        <Route
          path="/portfolio"
          element={isLoggedIn ? <Portfolio /> : <Navigate to="/login" />}
        />
        <Route
          path="/testimonials"
          element={isLoggedIn ? <Testimonials /> : <Navigate to="/login" />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
