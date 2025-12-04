FROM node:18-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias
RUN npm ci

# Copiar el resto de la aplicación
COPY .  .  

# Generar el cliente de Prisma
RUN npx prisma generate

# Exponer el puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]