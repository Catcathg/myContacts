"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Form = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState("https://vectorified.com/images/anonymous-person-icon-13.jpg");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            await axios.post(
                `${API_URL}/api/contacts`,
                { firstName, lastName, phone, image },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Contact ajouté !");
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            alert("Erreur lors de l'ajout du contact.");
        }
    };

    const handleBack = () => {
        navigate("/dashboard");
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label htmlFor="fname">First name:</label><br />
                    <input
                        type="text"
                        id="fname"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="lname">Last name:</label><br />
                    <input
                        type="text"
                        id="lname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="phone">Phone:</label><br />
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="image">Image:</label><br />
                    <input
                        type="text"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <button onClick={handleBack}
                    className="mt-2 px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 transition-colors"
                >
                    Retour
                </button>

                <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 transition-colors"
                >
                    Ajouter
                </button>
            </form>
        </div>
    );
};

export default Form;
