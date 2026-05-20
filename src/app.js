const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const departmentRoutes = require("./routes/department.routes");
const facultyRoutes = require("./routes/faculty.routes");
const studentRoutes = require("./routes/student.routes");
const courseRoutes = require("./routes/course.route");

// for middlewares
const errorHandler = require('./middlewares/errorHandler');
const {protect} = require('./middlewares/auth.middleware');


const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// API Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/departments", departmentRoutes);
app.use("/api/faculties", facultyRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);

// Routes
// All module routes registered above
// e.g. app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/auth/admin', require('./routes/admin-auth.routes'));
app.use('/api/auth/user', require('./routes/user-auth.routes'));
app.use('/api/announcements', require('./routes/announcement.routes'));
<<<<<<< HEAD
app.use('/api/result', require('./routes/resultRoute'));
=======
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/students', require('./routes/student.routes'));
>>>>>>> d2c8339c165ccee50aaa7a355c8dd75603d01ead

// Health Check
app.get("/", (req, res) => {
  res.json({ message: "Brooks Student Portal API is running 🎓" });
});

// DB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

app.use(errorHandler);

module.exports = { app, connectDB };