# mobile/Dockerfile
FROM node:18

WORKDIR /app

# Copier package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

EXPOSE 19006

# Commande pour démarrer l'application
CMD ["npm", "start"]