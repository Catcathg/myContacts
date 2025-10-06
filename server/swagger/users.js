const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

/**
 * @openapi
 * /users/register:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: motdepasse123
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Email déjà utilisé
 *
 * /users/login:
 *   post:
 *     summary: Connecte un utilisateur et retourne un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: motdepasse123
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       400:
 *         description: Email ou mot de passe invalide
 */

router.post("/register", register);
router.post("/login", login);

module.exports = router;
