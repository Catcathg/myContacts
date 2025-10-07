const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const auth = require("../middleware/auth");

/**
 * @openapi
 * tags:
 *   - name: Contacts
 *     description: Gestion des contacts de l'utilisateur connecté
 *
 * /api/contacts:
 *   get:
 *     summary: Récupère tous les contacts de l'utilisateur connecté
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des contacts récupérée avec succès
 *       401:
 *         description: Non autorisé - token invalide ou manquant
 *       500:
 *         description: Erreur serveur
 *
 *   post:
 *     summary: Crée un nouveau contact pour l'utilisateur connecté
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             firstName: "Jean"
 *             lastName: "Dujardin"
 *             email: "jean.dujardin@example.com"
 *             phone: "0123456789"
 *     responses:
 *       201:
 *         description: Contact créé avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé - token invalide ou manquant
 *       500:
 *         description: Erreur serveur
 *
 * /api/contacts/{id}:
 *   patch:
 *     summary: Met à jour un contact existant
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             firstName: "Jean"
 *             lastName: "Jardin"
 *             email: "jean.jardin@example.com"
 *             phone: "0123456789"
 *     responses:
 *       200:
 *         description: Contact mis à jour avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé - token invalide ou manquant
 *       404:
 *         description: Contact introuvable
 *       500:
 *         description: Erreur serveur
 *
 *   delete:
 *     summary: Supprime un contact existant
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     responses:
 *       200:
 *         description: Contact supprimé avec succès
 *       401:
 *         description: Non autorisé - token invalide ou manquant
 *       404:
 *         description: Contact introuvable
 *       500:
 *         description: Erreur serveur
 */

module.exports = router;
