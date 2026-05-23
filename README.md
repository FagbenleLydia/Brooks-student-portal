# Brooks Student Academy — Backend API

**Group 15 | TS Academy Capstone Project**

A RESTful API for a School Portal Management System built with **Node.js**, **Express**, and **MongoDB**.

---

## Group Members

| # | Name |
|---|------|
| 1 | Lydia Fagbenle |
| 2 | Hassan Hadi |
| 3 | Jude Ani |
| 4 | Daniel Anaja |
| 5 | Kenneth |
| 6 | Afintinni Aquilla |
| 7 | Nwachukwu Chibuikem |
| 8 | Chukwuka Ugbechie |

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
│   ├── controllers/        # Route handlers for auth, results, payments, announcements
│   │   ├── user-auth.controller.js
│   │   ├── admin-auth.controller.js
│   │   ├── student.controller.js
│   │   ├── resultController.js
│   │   ├── paymentController.js
│   │   └── announcement.controller.js
│   ├── routes/             # Express route definitions
│   │   ├── user-auth.routes.js
│   │   ├── admin-auth.routes.js
│   │   ├── student.routes.js
│   │   ├── resultRoute.js
│   │   ├── paymentRoutes.js
│   │   └── announcement.routes.js
│   ├── modules/            # Self-contained feature modules (controller + route + service)
│   │   ├── course/
│   │   ├── courseRegistration/
│   │   ├── departments/
│   │   ├── faculties/
│   │   ├── level/
│   │   ├── sessions/
│   │   └── students/
│   ├── services/           # Shared business logic
│   │   └── remitaService.js
│   ├── models/             # Mongoose schemas
│   │   ├── User.js
│   │   ├── Student.js
│   │   ├── Course.js
│   │   ├── Grade.js
│   │   ├── Attendance.js
│   │   ├── Announcement.js
│   │   ├── Session.js
│   │   ├── Department.js
│   │   ├── Faculty.js
│   │   ├── level.js
│   │   ├── result.js
│   │   ├── payment.js
│   │   ├── courseRegistration.js
│   │   └── Counter.js
│   ├── middlewares/
│   │   ├── auth.middleware.js      # JWT protect + role authorize
│   │   ├── errorHandler.js         # Global error handler
│   │   └── validate.middleware.js  # Input validation rules
│   ├── utils/
│   │   ├── emailTemplate.js        # HTML email template loader
│   │   └── mailer.js               # Nodemailer email sender
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

### Auth — User
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/user/register` | Register new user | Public |
| POST | `/api/auth/user/sign-in` | Login & get token | Public |
| GET | `/api/auth/user/me` | Get current user profile | Private |

### Auth — Admin
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/admin/admin-bootstrap` | Create default admin | Public |
| POST | `/api/auth/admin/create-user` | Admin creates a user | Admin |

### Students
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/students/profile` | Create student profile | Private |

### Courses
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/courses` | List all courses | Private |
| POST | `/api/courses` | Create course | Private |
| GET | `/api/courses/:id` | Get course by ID | Private |
| PUT | `/api/courses/:id` | Update course | Private |
| DELETE | `/api/courses/:id` | Delete course | Private |

### Course Registration
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/course-registrations` | Register courses (requires payment) | Private |
| GET | `/api/course-registrations` | List all registrations | Private |
| GET | `/api/course-registrations/:id` | Get registration by ID | Private |
| PUT | `/api/course-registrations/:id` | Update registration | Private |
| DELETE | `/api/course-registrations/:id` | Delete registration | Private |

### Results
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/result/uploadresult` | Upload student result | Teacher |
| GET | `/api/result/getresult` | Get own results | Student, Admin |
| GET | `/api/result/getcourseresult` | Get results for a course | Teacher, Admin |
| PUT | `/api/result/updateresult/:id` | Update a result | Teacher |
| GET | `/api/result/adminsearch` | Search results by student & level | Admin |

### Payments
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/payments/initiate` | Initiate payment | Private |
| PUT | `/api/payments/verify/:id` | Verify payment | Private |
| GET | `/api/payments/status` | Get payment status | Private |

### Announcements
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/announcements` | List announcements | Private |
| POST | `/api/announcements` | Post announcement | Admin, Teacher |
| DELETE | `/api/announcements/:id` | Delete announcement | Admin |

### Levels
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/levels` | List all levels | Private |
| POST | `/api/levels` | Create level | Admin |
| GET | `/api/levels/:id` | Get level by ID | Private |
| PUT | `/api/levels/:id` | Update level | Admin |
| DELETE | `/api/levels/:id` | Delete level | Admin |

### Sessions
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/sessions` | List all sessions | Private |
| POST | `/api/sessions` | Create session | Private |
| GET | `/api/sessions/current` | Get current session | Private |
| GET | `/api/sessions/:id` | Get session by ID | Private |
| PUT | `/api/sessions/:id` | Update session | Private |
| PATCH | `/api/sessions/:id/set-current` | Set as current session | Admin |
| DELETE | `/api/sessions/:id` | Delete session | Private |

### Departments
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/departments` | List all departments | Private |
| POST | `/api/departments` | Create department | Private |
| GET | `/api/departments/:id` | Get department by ID | Private |
| PUT | `/api/departments/:id` | Update department | Private |
| DELETE | `/api/departments/:id` | Delete department | Private |

### Faculties
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/faculties` | List all faculties | Private |
| POST | `/api/faculties` | Create faculty | Private |
| GET | `/api/faculties/:id` | Get faculty by ID | Private |
| PUT | `/api/faculties/:id` | Update faculty | Private |
| DELETE | `/api/faculties/:id` | Delete faculty | Private |

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
