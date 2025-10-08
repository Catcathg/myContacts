const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server"); 
const User = require("../models/User");
const Contact = require("../models/Contact");
const jwt = require("jsonwebtoken");

let token;
let userId;

beforeAll(async () => {
  // Connexion à la DB de test uniquement si pas déjà connecté
  const mongoUri = process.env.MONGO_URI_TEST;
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
}, 10000);

beforeEach(async () => {
  await User.deleteMany();
  await Contact.deleteMany();

  const user = await new User({ email: "user@test.com", password: "hashed" }).save();
  userId = user._id;

  token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
});

describe("Tests /api/contacts", () => {
  it("Création d’un contact", async () => {
    const res = await request(app)
      .post("/api/contacts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName: "Alice",
        lastName: "Smith",
        phone: "0612345678",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.firstName).toBe("Alice");

    const contactInDb = await Contact.findOne({ firstName: "Alice", user: userId });
    expect(contactInDb).not.toBeNull();
  });

  it("Récupération des contacts liés au user connecté", async () => {
    await new Contact({ firstName: "Bob", lastName: "Johnson", phone: "0623456789", user: userId }).save();

    const res = await request(app)
      .get("/api/contacts")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].firstName).toBe("Bob");
  });

  it("Mise à jour d’un contact existant", async () => {
    const contact = await new Contact({
      firstName: "Charlie",
      lastName: "Brown",
      phone: "0634567890",
      user: userId,
    }).save();

    const res = await request(app)
      .patch(`/api/contacts/${contact._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ firstName: "Charlie Updated" });

    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe("Charlie Updated");

    const contactUpdated = await Contact.findById(contact._id);
    expect(contactUpdated.firstName).toBe("Charlie Updated");
  });

  it("Impossible de mettre à jour un contact d’un autre user", async () => {
    const otherUserContact = await new Contact({
      firstName: "Eve",
      lastName: "Adams",
      phone: "0645678901",
      user: new mongoose.Types.ObjectId(),
    }).save();

    const res = await request(app)
      .patch(`/api/contacts/${otherUserContact._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ firstName: "Hacker" });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Contact introuvable");
  });

  it("Suppression d’un contact", async () => {
    const myContact = await new Contact({
      firstName: "David",
      lastName: "Lee",
      phone: "0656789012",
      user: userId,
    }).save();

    const res = await request(app)
      .delete(`/api/contacts/${myContact._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Contact supprimé");

    const contactInDb = await Contact.findById(myContact._id);
    expect(contactInDb).toBeNull();
  });
});
