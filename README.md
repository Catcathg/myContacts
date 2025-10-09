# myContacts
Projet fil rouge
Une application Full-Stack MERN (MongoDB, Express, React, Node.js) permettant aux utilisateurs de :
- S’inscrire et se connecter (avec JWT)
- Ajouter, éditer et supprimer des contacts
- Voir tous leurs contacts appartenant à l'utilisateur connecté

# Cloner le projet
git clone https://github.com/ton-user/ton-repo.git
cd ton-repo

# Installation du Backend et Frontent
cd server
npm install

cd ../frontend
npm install

# Lancer le Backend et Frontend 
cd server
npm run dev
=> le backend démarre sur http://localhost:3000

cd ../frontend
npm run dev
=> le frontend démarre sur http://localhost:5173

# API Endpoints
Authentification
Endpoint : /api/auth/register (Pour créer un nouvel utilisateur) POST
Endpoint : /api/auth/login (Connexion utilisateur) POST

Contacts (protégés par JWT)
Endpoint : /api/contacts (Récupère tous les contacts de l’utilisateur connecté) GET
Endpoint : /api/contacts (Ajoute un nouveau contact) POST
Endpoint : /api/contacts/:id (Met à jour un contact existant) PATCH
Endpoint : /api/contacts/:id (Supprime un contact) DELETE

# Swagger
Après avoir lancer le Backend, tu peux accéder à Swagger avec http://localhost:3000/api-docs
Tu auras une UI Swagger où tu pourras tester tous tes endpoints (avec le token JWT).

# Sécurité
- L’API utilise JWT pour sécuriser l’accès aux routes.
- Le token est stocké dans le localStorage côté frontend.

# Déploiement
Lien : https://mycontacts-a3hi.onrender.com
Swagger : https://mycontacts-1-7wx3.onrender.com/api-docs

# Identifiants Tests 
{
  "email": "test@example.com",
  "password": "motdepasse123"
}

# Notes 
Par défaut, les contacts créés ont une image :
https://vectorified.com/images/anonymous-person-icon-13.jpg
Adapter le MONGO_URI dans le .env si vous utilisez Atlas.

