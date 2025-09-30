# Etapa 1: build
FROM node:20 AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia archivos esenciales
COPY src/package.json src/package-lock.json ./
RUN npm install

# Copia el resto del código
COPY . .

# Compila el proyecto TypeScript
RUN npm run build

# Etapa 2: producción
FROM node:20-slim

# Crea usuario no root
RUN useradd -m appuser

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo lo necesario desde el build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
RUN npm install --omit=dev

# Establece permisos seguros
USER appuser

# Puerto expuesto (ajustar si cambias el puerto en `.env`)
EXPOSE 3000

# Comando para ejecutar la app
CMD ["node", "dist/server.js"]
