# Usa una imagen base de Node.js
FROM node:20

# directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos al directorio de trabajo
COPY . .

# Compilat TS
RUN npm run build

# puerto
EXPOSE 3000

# Ejecutar app
CMD ["npm", "start"]