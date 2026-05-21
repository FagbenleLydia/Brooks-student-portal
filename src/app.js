const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const departmentRoutes = require("./modules/departments/department.routes");
const facultyRoutes = require("./modules/faculties/faculty.routes");
const studentRoutes = require("./modules/students/student.routes");
const courseRoutes = require("./modules/course/course.routes");
const levelRoutes = require('./modules/level/level.route');

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
// app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use('/api/levels', levelRoutes);

// Routes
// All module routes registered above
// e.g. app.use('/api/auth', require('./routes/auth.routes'));

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