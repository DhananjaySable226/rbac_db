# RBAC Demo (Node/Express + PostgreSQL + React)

Monorepo structure with `backend` and `frontend`.

## Predefined Users

All passwords: `password`

- superadmin@test.com → SuperAdmin
- admin@test.com → Admin
- hr@test.com → HR
- sales@test.com → Sales
- support@test.com → SupportAgent

Seed runs automatically on backend start (idempotent).

## Backend

Tech: Express, Sequelize (PostgreSQL), JWT, bcrypt, CORS, dotenv.

Env variables (`backend/.env`):

```
PORT=4000
JWT_SECRET=please_change_me
DB_HOST=localhost
DB_PORT=5432
DB_NAME=rbac_db
DB_USER=postgres
DB_PASS=your_password
```

Install and run:

```
cd backend
npm i
npm run dev
```

API:

- POST /api/login → { token, role, user }
- GET /api/admin → Admin, SuperAdmin
- GET /api/hr → HR, SuperAdmin
- GET /api/support → SupportAgent, SuperAdmin

## Frontend

Tech: React + Vite, React Router, Axios.

Optional env (`frontend/.env`):

```
VITE_API_URL=http://localhost:4000/api
```

Install and run:

```
cd frontend
npm i
npm run dev
```

Behavior:

- Login stores token, role, and user in localStorage via AuthContext.
- Nav shows only pages permitted for the logged-in role.
- Protected routes redirect to login if unauthenticated and to 403 if forbidden.

## Notes

- SuperAdmin can access all protected routes automatically.
- Bonus (not implemented): permissions-based checks and SuperAdmin panel.


