# Vedamitra

Vedamitra is a full-stack mobile + API platform for mantra alarms, sacred text reading, chant tracking, and dashboard analytics.

## Monorepo Structure

- `backend` - Express + TypeScript + MongoDB REST API
- `frontend` - Expo React Native + TypeScript app

## Features

- Smart mantra alarms with backend persistence + local notifications
- Sacred text reader for Bhagavad Gita and Ramayana (seeded sample chapters/verses)
- Mantra chant counter with streak tracking and cloud sync
- Dashboard analytics (total chants, streak, top mantras, 7-day trend)
- JWT authentication and persisted mobile login session

## Run Locally (Full Stack)

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

Backend will run on `http://localhost:4000`.

### 2) Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run start
```

Then launch Android/iOS/Web from Expo terminal.

## Local verification checklist

- Register and login in mobile app
- Open **Mantras** tab and chant from mantra detail
- Open **Texts** tab and navigate book -> chapter -> verses
- Open **Alarm** tab, create alarm, verify alarm appears in list and can be deleted
- Open **Dashboard** tab and verify total/streak/weekly/top mantra analytics

## Troubleshooting

- If install fails with corporate proxy/registry policy, set npm registry access correctly and retry.
- If notifications do not fire on simulator, test on a physical device.
- Ensure MongoDB is running before `npm run dev` and `npm run seed`.
