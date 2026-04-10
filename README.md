# BIM Predict Starter

Base de depart avec :

- `frontend/` : application Angular standalone
- `backend/` : API NestJS
- integration Firebase web cote client et Firebase Admin cote serveur

## Demarrage

1. Installer les dependances :

```bash
npm run setup
```

2. Backend :
   copier `backend/.env.example` vers `backend/.env` puis renseigner les variables Firebase.
3. Frontend :
   mettre votre configuration Firebase web dans `frontend/src/environments/environment.ts`.
4. Lancer les apps dans deux terminaux :

```bash
npm run start:backend
npm run start:frontend
```

Le frontend est servi sur `http://localhost:4200` et appelle l'API Nest sur `http://localhost:3000/api`.

## Scripts racine

```bash
npm run start:backend
npm run start:frontend
npm run build
npm run setup
```

## Verification rapide

- `GET http://localhost:3000/api/health` retourne l'etat du backend
- la page Angular affiche si Firebase client et Firebase Admin sont configures
