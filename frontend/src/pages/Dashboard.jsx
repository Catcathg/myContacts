"use client";
import React, { useEffect, useState } from "react";
import ContactList from '../components/ContactList';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/connexion");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  };

  const handleAddContact = () => {
    navigate("/ajouter-contact", { state: { refreshDashboard: () => setRefreshKey(prev => prev + 1) } });
  };

  return (
    <div className="p-4">
      <ContactList refreshKey={refreshKey} />

      <button
        onClick={handleAddContact}
        className="mt-4 px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 transition-colors"
      >
        Ajouter un contact
      </button>

      <br />

      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-black rounded hover:bg-red-600 transition-colors"
      >
        Déconnexion
      </button>
    </div>
  );
};

export default Dashboard;
