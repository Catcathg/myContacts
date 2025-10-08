"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({ firstName: "", lastName: "", phone: "", image: "" });

    const fetchContacts = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(`${API_URL}/api/contacts`, {
                headers: { Authorization: `Bearer ${token}` }
            });

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

    const startEditing = (contact) => {
        setEditingId(contact._id);
        setEditData({
            firstName: contact.firstName,
            lastName: contact.lastName,
            phone: contact.phone,
            image: contact.image || "https://vectorified.com/images/anonymous-person-icon-13.jpg"
        });
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const saveEdit = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.patch(`${API_URL}/api/contacts/${id}`, editData, {
                headers: { Authorization: `Bearer ${token}` }
              });              
            setEditingId(null);
            fetchContacts(); // rafraîchir la liste
        } catch (err) {
            alert("Erreur lors de la modification du contact.");
            console.error(err);
        }
    };

    if (loading) return <div><strong>Chargement des contacts...</strong></div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="contact-list">
            <h2><strong>Mes Contacts</strong></h2>
            {contacts.length === 0 ? (
                <p>Aucun contact trouvé.</p>
            ) : (
                <ul className="space-y-2">
                    {contacts.map((contact) => (
                        <li key={contact._id} className="flex items-center gap-2">
                            {editingId === contact._id ? (
                                <>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={editData.firstName}
                                        onChange={handleEditChange}
                                        className="border p-1 rounded w-24"
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={editData.lastName}
                                        onChange={handleEditChange}
                                        className="border p-1 rounded w-24"
                                    />
                                    <input
                                        type="text"
                                        name="phone"
                                        value={editData.phone}
                                        onChange={handleEditChange}
                                        className="border p-1 rounded w-24"
                                    />
                                    <input
                                        type="text"
                                        name="image"
                                        value={editData.image}
                                        onChange={handleEditChange}
                                        className="border p-1 rounded w-48"
                                    />
                                    <button
                                        onClick={() => saveEdit(contact._id)}
                                        className="px-2 py-1 bg-green-500 text-black rounded"
                                    >
                                        Enregistrer
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="px-2 py-1 bg-gray-300 rounded"
                                    >
                                        Supprimer
                                    </button>
                                </>
                            ) : (
                                <>
                                    <img src={contact.image} alt="avatar" className="w-8 h-8 rounded-full" />
                                    <strong>{contact.firstName} {contact.lastName}</strong> - {contact.phone}
                                    <button
                                        onClick={() => startEditing(contact)}
                                        className="ml-2 px-2 py-1 bg-blue-500 text-black rounded"
                                    >
                                        Modifier
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ContactList;
