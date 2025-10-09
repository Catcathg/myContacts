"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Form = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Vous devez être connecté !");
      navigate("/connexion");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://mycontacts-1-7wx3.onrender.com/api/contacts",
        { firstName, lastName, phone, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Contact ajouté :", response.data);
      alert("Contact ajouté avec succès !");
      navigate("/dashboard"); // redirige vers Dashboard pour recharger la liste
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      alert(
        "Erreur lors de l'ajout du contact : " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Ajouter un contact</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Téléphone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Image (URL)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Ajout en cours..." : "Ajouter"}
        </button>
      </form>
    </div>
  );
};

export default Form;
