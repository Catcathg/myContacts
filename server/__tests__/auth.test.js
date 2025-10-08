const request = require("supertest");
const app = require("../server"); 
const User = require("../models/User");

describe("Tests /auth", () => {
  beforeEach(async () => {
    // On nettoie les users avant chaque test (setup.js nettoie déjà, mais double sécurité ici si besoin)
    await User.deleteMany();
  });

  it("Inscription d’un nouvel utilisateur", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ email: "test@test.com", password: "123456" });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Utilisateur créé avec succès");

    const userInDb = await User.findOne({ email: "test@test.com" });
    expect(userInDb).not.toBeNull();
  });

  it("Refus si email déjà utilisé", async () => {
    await new User({ email: "test@test.com", password: "hashedpassword" }).save();

    const res = await request(app)
      .post("/auth/register")
      .send({ email: "test@test.com", password: "123456" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Cet email est déjà utilisé.");
  });

  it("Connexion avec email/password corrects → retourne un token", async () => {
    await request(app)
      .post("/auth/register")
      .send({ email: "test@test.com", password: "123456" });

    const res = await request(app)
      .post("/auth/login")
      .send({ email: "test@test.com", password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");
  });

  it("Connexion échoue si mauvais mot de passe", async () => {
    await request(app)
      .post("/auth/register")
      .send({ email: "test@test.com", password: "123456" });

    const res = await request(app)
      .post("/auth/login")
      .send({ email: "test@test.com", password: "wrongpass" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Email ou mot de passe invalide.");
  });
});
