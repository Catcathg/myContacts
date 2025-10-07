"use client"

import './home.css'
import React from "react";

const Home = () => {
  return (
    <div className="header">
      <h1>Contact App</h1>
      <button><a href="/connexion">Connexion</a></button>
      <button><a href="/inscription">Inscription</a></button>
    </div>
  );
};

export default Home;
