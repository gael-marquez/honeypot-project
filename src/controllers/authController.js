import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Mostrar formulario de login
export const showLogin = (req, res) => {
  res.render("login");
};

// Mostrar formulario de registro
export const showRegister = (req, res) => {
  res.render("register");
};

// Registrar usuario
export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Crear usuario en la base de datos
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "user"
      }
    });
    
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al registrar usuario");
  }
};

// Login de usuario
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    // Verificar contraseña
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Credenciales inválidas");
    }
    
    // Guardar sesión
    req.session.userId = user.id;
    req.session.role = user.role;
    
    // Redirigir según rol
    if (user.role === "admin") {
      res.redirect("/admin");
    } else {
      res.redirect("/user");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
};

// Cerrar sesión
export const logoutUser = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};

// Página de usuario
export const userPage = (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  res.render("user");
};