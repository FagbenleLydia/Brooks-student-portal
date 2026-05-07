# Brooks Student Academy — Backend API

**Group 15 | TS Academy Capstone Project**

A RESTful API for a School Portal Management System built with **Node.js**, **Express**, and **MongoDB**.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js (v18+) |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Validation | express-validator |
| Logging | Winston + Morgan |
| Docs | Swagger UI |


## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/FagbeneLydia/Brooks-student-portal.git
cd Brooks-student-portal
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Then open `.env` and update with your values:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/portal_academy?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
```

### 4. Start the server

```bash
# Development (auto-restart on changes)
npm run dev

# Production
npm start
```

Server runs at: `http://localhost:5000`  
API Docs at: `http://localhost:5000/api-docs`

---

## Project Structure

```
Brooks-Student-Portal/
├── src/
│   ├── controllers/        # Route handlers / business logic
│   │   ├── auth.controller.js
│   │   ├── student.controller.js
│   │   ├── course.controller.js
│   │   └── grade.controller.js
│   ├── routes/             # Express route definitions
│   │   ├── auth.routes.js
│   │   ├── student.routes.js
│   │   ├── course.routes.js
│   │   ├── grade.routes.js
│   │   ├── attendance.routes.js
│   │   ├── teacher.routes.js
│   │   └── announcement.routes.js
│   ├── services/           # Business logic layer (shared across controllers)
│   ├── models/             # Mongoose schemas
│   │   ├── user.model.js
│   │   ├── student.model.js
│   │   ├── course.model.js
│   │   ├── grade.model.js
│   │   ├── attendance.model.js
│   │   └── announcement.model.js
│   ├── middlewares/
│   │   ├── auth.middleware.js      # JWT protect + role authorize
│   │   ├── errorHandler.js         # Global error handler
│   │   └── validate.middleware.js  # Input validation rules
│   ├── utils/
│   │   ├── logger.js               # Winston logger
│   │   └── generateToken.js        # JWT token generator
│   └── app.js              # Express app setup
├── server.js               # App entry point
├── swagger.json            # API documentation
├── .env.example            # Sample environment file
├── .gitignore
└── package.json
```

---

## Auth & Roles

All protected routes require a `Bearer` token in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

| Role | Permissions |
|------|------------|
| `admin` | Full access to all resources |
| `teacher` | Manage courses, grades, attendance |
| `student` | View own profile, grades, courses |
| `parent` | View child's grades and attendance |

---

## API Endpoints Summary

### Auth
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login & get token | Public |
| GET | `/api/auth/me` | Get current user | Private |

### Students
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/students` | List all students | Admin, Teacher |
| GET | `/api/students/:id` | Get student by ID | Private |
| PUT | `/api/students/:id` | Update student | Admin |
| DELETE | `/api/students/:id` | Delete student | Admin |

### Courses
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/courses` | List all courses | Private |
| POST | `/api/courses` | Create course | Admin |
| GET | `/api/courses/:id` | Get course | Private |
| PUT | `/api/courses/:id` | Update course | Admin, Teacher |
| DELETE | `/api/courses/:id` | Delete course | Admin |
| POST | `/api/courses/:id/enroll` | Enroll student | Admin |

### Grades
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/grades` | Record grades | Teacher, Admin |
| GET | `/api/grades/student/:id` | Get student grades + GPA | Private |
| PUT | `/api/grades/:id` | Update grade | Teacher, Admin |

### Attendance
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/attendance` | Mark attendance | Teacher, Admin |
| GET | `/api/attendance/course/:id` | Get course attendance | Private |
| GET | `/api/attendance/student/:id` | Get student attendance | Private |

### Announcements
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/announcements` | List announcements | Private |
| POST | `/api/announcements` | Post announcement | Admin, Teacher |
| DELETE | `/api/announcements/:id` | Delete announcement | Admin |

---

## Team Collaboration Guide

1. **Never push directly to `main`** — always work on your feature branch
2. Branch naming: `feature/your-feature-name` (e.g. `feature/grade-report`)
3. Open a Pull Request when your feature is ready
4. At least one team member must review before merging

```bash
# Start a new feature
git checkout -b feature/your-feature-name

# Push your branch
git push origin feature/your-feature-name
```

---

## API Documentation

Full interactive docs available at `http://localhost:5000/api-docs` after starting the server.
