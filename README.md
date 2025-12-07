# 🛡️ Honeypot Project - Equipo 5 CS

> Proyecto académico de Ciberseguridad enfocado en la implementación de una arquitectura web segura utilizando contenedores y buenas prácticas de desarrollo backend.

![NodeJS](https://img.shields.io/badge/Node.js-18-green) ![Express](https://img.shields.io/badge/Express-v5-blue) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-wl) ![Docker](https://img.shields.io/badge/Docker-Compose-2496ED) ![License](https://img.shields.io/badge/License-ISC-yellow)

## 📖 Descripción

Este proyecto consiste en el desarrollo de una aplicación web segura diseñada para mitigar vulnerabilidades comunes en sistemas distribuidos. El sistema implementa controles de seguridad activos y pasivos, incluyendo gestión de sesiones seguras, protección de cabeceras HTTP y hashing de credenciales, todo orquestado mediante una arquitectura de microservicios con Docker.

El objetivo es demostrar la integración de tecnologías modernas (`Node.js`, `Prisma`, `PostgreSQL`) cumpliendo con estándares de seguridad como la protección contra inyecciones SQL y ataques XSS.

## 🚀 Tecnologías Utilizadas

El proyecto utiliza un stack tecnológico robusto definido en `package.json` y `docker-compose.yml`:

* **Runtime:** Node.js (v18-alpine)
* **Framework:** Express.js (v5.1.0)
* **Base de Datos:** PostgreSQL 15
* **ORM:** Prisma (v6.19.0)
* **Seguridad:**
    * `Helmet`: Protección de cabeceras HTTP.
    * `Bcrypt`: Hashing de contraseñas.
    * `Express-Session`: Gestión segura de sesiones (Cookies firmadas, HttpOnly).
* **Infraestructura:** Docker & Docker Compose.
* **Motor de Vistas:** EJS.

## ⚙️ Instalación y Configuración

Sigue estos pasos para levantar el proyecto en tu entorno local.

### Prerrequisitos
* [Docker Desktop](https://www.docker.com/) instalado y corriendo.
* Git.

### 1. Clonar el repositorio

git clone [https://github.com/gael-marquez/honeypot-project.git](https://github.com/gael-marquez/honeypot-project.git)
cd honeypot-project


### 2\. Configuración de Variables de Entorno

El proyecto **NO** incluye el archivo `.env` por seguridad. Debes crear uno basado en el ejemplo proporcionado:

cp .env.example .env

Asegúrate de que tu archivo `.env` contenga las credenciales correctas (por defecto configuradas para Docker):

DATABASE_URL="postgresql://postgres:admin123@postgres:5432/honeypot_db?schema=public"
SESSION_SECRET="tu_clave_super_secreta_y_segura"
PORT=3000

> **Nota:** Si ejecutas el proyecto sin Docker (localmente con Node), cambia el host de la base de datos en `DATABASE_URL` de `postgres` a `localhost`.

### 3\. Despliegue con Docker (Recomendado)

La forma más sencilla de ejecutar la aplicación y la base de datos es utilizando Docker Compose, el cual construirá la imagen y ejecutará las migraciones de Prisma automáticamente.

docker-compose up --build

Una vez finalizado, la aplicación estará disponible en: `http://localhost:3000`

### 4\. Ejecución Manual (Sin Docker)

Si prefieres ejecutarlo manualmente (requiere tener PostgreSQL instalado localmente):

1.  Instala dependencias:
    npm install

2.  Genera el cliente de Prisma:
    npx prisma generate
    
3.  Ejecuta las migraciones (asegúrate de tener la DB corriendo):
    npx prisma migrate deploy
    
4.  Inicia el servidor:
    npm run dev

## 📂 Estructura del Proyecto

honeypot-project/
├── prisma/             # Esquemas y migraciones de base de datos
├── src/
│   ├── app.js          # Punto de entrada de la aplicación
│   └── ...             # Controladores, rutas y vistas
├── .dockerignore       # Archivos excluidos del contenedor
├── .env.example        # Plantilla de variables de entorno
├── docker-compose.yml  # Orquestación de servicios (App + DB)
├── Dockerfile          # Definición de la imagen de la aplicación
└── package.json        # Dependencias y scripts

## 🛡️ Características de Seguridad Implementadas

  * **Aislamiento de Entorno:** Ejecución sobre `Alpine Linux` para minimizar la superficie de ataque.
  * **Protección de Datos:** Uso de `Prisma ORM` para prevenir Inyecciones SQL.
  * **Cabeceras Seguras:** Implementación de `Helmet` para ofuscación y protección contra XSS/Clickjacking.
  * **Autenticación Robusta:** Almacenamiento de contraseñas con salt usando `Bcrypt`.

## 👥 Autores - Equipo 5 CS

  * **Hernandez Aranda Hector Alejandro**
  * **Márquez Rodríguez Gael Alejandro** 
  * **Trejo Hernández Brandon**


**Escuela Superior de Cómputo (ESCOM) - Instituto Politécnico Nacional (IPN)**

### Puntos clave considerados para este README:

1.  [cite_start]**Cumplimiento de Rúbrica:** Menciona explícitamente que el `.env` no se sube y se usa el `.env.example`[cite: 9, 15].
2.  [cite_start]**Tecnologías:** Lista exactamente las versiones y paquetes que están en tu `package.json` (`express ^5.1.0`, `prisma ^6.19.0`, `helmet`, etc.)[cite: 1].
3.  [cite_start]**Docker:** Incluye las instrucciones precisas para levantar el proyecto con `docker-compose`, ya que vi que tienes configurado el servicio `postgres` y `app`[cite: 14].
4.  [cite_start]**Profesionalismo:** Usa "badges" (escudos) al principio y una estructura clara, lo cual ayuda con el criterio de "Repositorio GitHub" de la rúbrica[cite: 3].