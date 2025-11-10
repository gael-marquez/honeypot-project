import express from "express";

const router = express.Router();

// Middleware para verificar si es admin
function isAdmin(req, res, next) {
  if (!req.session.userId || req.session.role !== "admin") {
    return res.status(403).send("Acceso denegado");
  }
  next();
}

router.get("/", isAdmin, (req, res) => {
  res.render("admin");
});

export default router;