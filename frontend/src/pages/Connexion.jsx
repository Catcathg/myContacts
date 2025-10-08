"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Connexion = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://mycontacts-a3hi.onrender.com/auth/login",
        { email, password }
      );

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token); // ✅ Stockage du token
        navigate("/dashboard");
      } else {
        alert("Connexion échouée : pas de token reçu");
      }
    } catch (err) {
      alert(
        err.response
          ? `Erreur ${err.response.status} : ${err.response.data.message}`
          : "Erreur serveur"
      );
    }
  };

  return (
    <div className="p-4">
      <h2>Connexion</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-2 w-64">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-1 rounded"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-1 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Connexion;
