const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; 

  if (!token) return res.status(401).json({ message: "Accès refusé, token manquant" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //req.user.id (le user connecté)
    next(); // passe au contrôleur
  } catch (err) {
    res.status(403).json({ message: "Token invalide" });
  }
};
