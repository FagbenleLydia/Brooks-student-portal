const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const departmentRoutes = require("./routes/department.routes");
const facultyRoutes = require("./routes/faculty.routes");
const courseRoutes = require("./routes/course.routes");
const levelRoutes = require('./routes/level.route');
const sessionRoutes = require('./routes/session.routes');
const courseRegistrationRoutes = require('./routes/courseRegistration.route');
const paymentRoutes = require('./routes/paymentRoutes');

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

// Routes
app.use('/api/announcements', require('./routes/announcement.routes'));

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