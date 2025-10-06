const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const auth = require("../middleware/auth");

/**
 * @openapi
 * /contacts:
 *   get:
 *     summary: Récupère tous les contacts de l'utilisateur connecté
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *
 *   post:
 *     summary: Crée un nouveau contact pour l'utilisateur connecté
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       201:
 *         description: Contact créé avec succès
 *
 * /contacts/{id}:
 *   patch:
 *     summary: Met à jour un contact existant (seulement si appartient à l'utilisateur connecté)
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
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       200:
 *         description: Contact mis à jour
 *       404:
 *         description: Contact introuvable
 *
 *   delete:
 *     summary: Supprime un contact existant (seulement si appartient à l'utilisateur connecté)
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
 *         description: Contact supprimé
 *       404:
 *         description: Contact introuvable
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     ContactServeur:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 651f26a5c7d9e1a23a4b9e6c
 *         firstName:
 *           type: string
 *           example: Paul
 *         lastName:
 *           type: string
 *           example: Dupont
 *         phone:
 *           type: string
 *           example: "0623456789"
 *         image:
 *           type: string
 *           example: "https://vectorified.com/images/anonymous-person-icon-13.jpg"
 *         user:
 *           type: string
 *           description: ID du user propriétaire
 *     ContactRequete:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - phone
 *       properties:
 *         firstName:
 *           type: string
 *           example: Christine
 *         lastName:
 *           type: string
 *           example: Lamartine
 *         phone:
 *           type: string
 *           example: "0678901234"
 *         image:
 *           type: string
 *           example: "https://example.com/avatar.png"
 */

router.get("/", auth, contactController.getContact);
router.post("/", auth, contactController.createContact);
router.patch("/:id", auth, contactController.updateContact);
router.delete("/:id", auth, contactController.deleteContact);

module.exports = router;
