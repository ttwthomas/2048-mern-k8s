# A Propos
Cette application sert le jeu 2048 et enregistre les meilleures scores dans une base de données MongoDB.
L'API utilise le framework express.js

# Installation
## Télecharger les sources de l'application
```
git clone https://github.com/ttwthomas/2048-mern.git
```

## Installer NPM
```
apt update 
apt install npm
```

## Builder l'application client 
```cd client
npm install
npm run build
```

## Builder l'application server (API scores) 
```cd server
npm install
```

## Lancer l'application:
```
npm run start
```

L'application se lance sur le (port 5000)[](localhost:5000/index.html)
L'api est disponible sur (/api/scores)[localhost:5000/api/scores]