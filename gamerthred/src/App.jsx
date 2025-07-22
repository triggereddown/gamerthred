import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Footer from "./components/Footer";
import About from "./components/About";
import Tos from "./pages/Tos/Tos";
import Privacy from "./pages/Privacy/Privacy";
import Disclaimer from "./pages/Disclaimer/Disclaimer";
import Profile from "./pages/Profile/Profile";
import Games from "./pages/Games/Games";
import GameDetail from "./pages/GameDetail/GameDetail";

import Loading from "./components/Loading";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tos" element={<Tos />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:gameId" element={<GameDetail />} />
      </Routes>
      <About />
      <Footer />
    </Router>
  );
};

export default App;
