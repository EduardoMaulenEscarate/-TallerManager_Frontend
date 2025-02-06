FROM node:18-alpine

WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package.json package-lock.json ./


# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto de desarrollo
EXPOSE 5173

# Comando para iniciar el servidor
CMD ["npm", "run", "dev"]