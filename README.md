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
- Improved mobile UX with polished cards, opening animation, refreshable dashboard, and mantra picker for alarms

## Run Locally (Full Stack)

### 1) Start MongoDB

Make sure MongoDB is running locally:

```bash
mongod
```

### 2) Backend API

```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

Backend runs at `http://localhost:4000`.

### 3) Frontend (Expo)

```bash
cd frontend
cp .env.example .env
npm install
npm run start
```

Then launch Android/iOS/Web from Expo terminal.

## Important device networking note

If you are testing on a **physical device**, frontend auto-resolves host from Expo dev server.
You can also override manually by setting in `frontend/.env`:

```env
EXPO_PUBLIC_API_URL=http://<YOUR_LOCAL_IP>:4000/api
```

## Local verification checklist

- Register and login in mobile app
- Open **Mantras** tab and chant from mantra detail
- Open **Texts** tab and navigate book -> chapter -> verses
- Open **Alarm** tab, choose mantra chip, create alarm, verify alarm appears in list and can be deleted
- Open **Dashboard** tab and verify total/streak/weekly/top mantra analytics (pull to refresh)

## Troubleshooting

- If `npm install` fails with corporate proxy/registry policy, set npm registry/proxy and retry.
- If notifications do not fire on simulator, test on a physical device.
- Ensure MongoDB is running before `npm run dev` and `npm run seed`.
