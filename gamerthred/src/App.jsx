import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

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
import OtpVerification from "./pages/Otp/Otp";
import Loading from "./components/Loading";
import Forgot from "./pages/Forgot/Forgot";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Rewards from "./pages/Rewards/Rewards";
import Missions from "./pages/Missions/Missions";

import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import MissionDetails from "./pages/MissionDetail/MissionDetail";

const AppWrapper = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tos" element={<Tos />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:gameId" element={<GameDetail />} />
        <Route path="/verify-otp/:email" element={<OtpVerification />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/missiondetails" element={<MissionDetails />} />
        <Route path="/changepassword/:vs_code" element={<ForgotPassword />} />
      </Routes>

      {location.pathname === "/" && <About />}

      <Footer />
    </>
  );
};

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
      <AppWrapper />
    </Router>
  );
};

export default App;
