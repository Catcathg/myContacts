"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContacts = async () => {
    try {
      
      const response = await axios.get("http://localhost:3000/api/contacts");

      setContacts(response.data);
      setError(null);

    } catch (err) {
      setError(
        err.response 
          ? `Erreur ${err.response.status} : ${err.response.data.message}` 
          : `Erreur serveur : ${err.message}` 
      );
      setContacts([]);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) return <div>Chargement des contacts...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="contact-list">
      <h2>Mes Contacts</h2>
      {contacts.length === 0 ? (
        <p>Aucun contact trouvé.</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <strong>{contact.nom} {contact.prenom}</strong> - {contact.email} - {contact.tel}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactList;