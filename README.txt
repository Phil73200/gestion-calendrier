Projet Calendrier FFS - Stack React + Express + SQLite

1. Backend Express
------------------
cd backend
npm install
node server.js

2. Frontend React (Vite ou autre)
------------------
cd frontend
npm install
npm run dev

⚠️ Le fichier SQLite 'calendar.db' est à placer dans /backend

Routes disponibles :
- GET /api/candidatures
- GET /api/courses_validees
- POST /api/validate/:id
