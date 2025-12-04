import express from "express";
import session from "express-session";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

// Configurar Helmet para permitir EJS
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}));

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, sameSite: "strict" }
}));

app.set("view engine", "ejs");
app.set("views", path.join(process. cwd(), "src/views"));

// Ruta raíz
app.get("/", (req, res) => {
    res.redirect("/login");
});

app.use("/", authRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));

// Cerrar Prisma correctamente
process. on('SIGTERM', async () => {
    await prisma.$disconnect();
    process.exit(0);
});