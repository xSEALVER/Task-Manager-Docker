# Image de départ : Linux léger avec Node 20 installé
FROM node:20-alpine

# Dossier de travail dans le conteneur
WORKDIR /app

# On copie d'abord SEULEMENT la liste des dépendances...
COPY package*.json ./

# ...pour que l'installation soit mise en cache
RUN npm install

# Puis le reste du code
COPY . .

# Documente le port utilisé par l'API
EXPOSE 3000

# Commande lancée au démarrage du conteneur
CMD ["node", "index.js"]