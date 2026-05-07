# User Form Management System

A full-stack web application for managing users, forms, and employees with role-based access control.

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router, Axios

**Backend:** Node.js, Express.js, MongoDB, Mongoose

**Auth:** JWT, bcrypt

**Email:** Nodemailer (Gmail)

## Features

- User Signup/Login with JWT authentication
- Role-based access (Admin, Employee, User)
- Admin Panel with dashboard, users, forms, employees
- Create employees with auto-generated credentials via email
- Employee can access dashboard but cannot manage employees
- Password change from settings
- Protected routes on both frontend and backend

## Project Structure
Client-dev/
├── FormFlow/
│   └── backend/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── utils/
│       └── server.js
└── frontend/
└── src/
├── pages/
│   ├── admin/
│   └── ...
└── services/

## Setup

### Backend
```bash
cd FormFlow/backend
npm install
```

`.env` file banao:
MONGODB_URI=your_mongo_url
JWT_SECRET=your_secret
EMAIL_USER=your_gmail
EMAIL_PASS=your_app_password
PORT=5000

```bash
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Routes

| Method | Route | Access |
|--------|-------|--------|
| POST | /api/auth/signup | Public |
| POST | /api/auth/login | Public |
| POST | /api/auth/change-password | Auth |
| GET | /api/admin/users | Admin/Employee |
| GET | /api/admin/forms | Admin/Employee |
| GET | /api/admin/employees | Admin/Employee |
| POST | /api/admin/create-employee | Admin only |
| PUT | /api/admin/employees/:id | Admin only |
| DELETE | /api/admin/employees/:id | Admin only |

## Roles

| Role | Access |
|------|--------|
| Admin | Full access |
| Employee | Dashboard, Users, Forms only |
| User | Own dashboard only |
