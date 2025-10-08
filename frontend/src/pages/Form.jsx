"use client";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onAdd = location.state?.onAdd;
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Utilisateur non authentifié");

    try {
      const response = await axios.post(
        "https://mycontacts-a3hi.onrender.com/api/contacts",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        alert("Contact créé avec succès !");
        if (onAdd) onAdd(); // rafraîchir la liste dans Dashboard
        navigate("/dashboard");
      } else {
        alert("Erreur : le contact n'a pas été créé !");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur lors de la création du contact !");
    }
  };

  return (
    <div className="p-4">
      <h2>Ajouter un contact</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
        <input type="text" name="firstName" placeholder="Prénom" value={formData.firstName} onChange={handleChange} required className="border p-1 rounded"/>
        <input type="text" name="lastName" placeholder="Nom" value={formData.lastName} onChange={handleChange} required className="border p-1 rounded"/>
        <input type="text" name="phone" placeholder="Téléphone" value={formData.phone} onChange={handleChange} required className="border p-1 rounded"/>
        <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="border p-1 rounded"/>
        <button type="submit" className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600">Créer</button>
      </form>
    </div>
  );
};

export default Form;
