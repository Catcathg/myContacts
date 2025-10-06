const request = require("supertest");
const app = require("../server"); 
const User = require("../models/User");
const Contact = require("../models/Contact");
const jwt = require("jsonwebtoken");

let token;
let userId;

beforeEach(async () => {
  // Nettoyage des collections
  await User.deleteMany();
  await Contact.deleteMany();

  // Créer un utilisateur de test
  const user = await new User({ email: "user@test.com", password: "hashed" }).save();
  userId = user._id;

  // Générer un token JWT
  token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
});

describe("Tests /contacts", () => {
  it("Création d’un contact", async () => {
    const res = await request(app)
      .post("/contacts")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Alice", email: "alice@mail.com" });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Alice");

    const contactInDb = await Contact.findOne({ name: "Alice", user: userId });
    expect(contactInDb).not.toBeNull();
  });

  it("Récupération des contacts liés au user connecté", async () => {
    await new Contact({ name: "Bob", email: "bob@mail.com", user: userId }).save();

    const res = await request(app)
      .get("/contacts")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Bob");
  });

  it("Mise à jour d’un contact existant", async () => {
    const contact = await new Contact({ name: "Charlie", email: "charlie@mail.com", user: userId }).save();

    const res = await request(app)
      .put(`/contacts/${contact._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Charlie Updated" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Charlie Updated");

    const contactUpdated = await Contact.findById(contact._id);
    expect(contactUpdated.name).toBe("Charlie Updated");
  });

  it("Impossible de mettre à jour un contact d’un autre user", async () => {
    const otherUserContact = await new Contact({
      name: "Eve",
      email: "eve@mail.com",
      user: "507f1f77bcf86cd799439011" 
    }).save();

    const res = await request(app)
      .put(`/contacts/${otherUserContact._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Hacker" });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Contact introuvable");
  });

  it("Suppression d’un contact", async () => {
    const myContact = await new Contact({ name: "David", email: "david@mail.com", user: userId }).save();

    const res = await request(app)
      .delete(`/contacts/${myContact._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Contact supprimé");

    const contactInDb = await Contact.findById(myContact._id);
    expect(contactInDb).toBeNull();
  });
});
