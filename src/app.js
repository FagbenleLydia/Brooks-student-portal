const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// API Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/auth/admin', require('./routes/admin-auth.routes'));
app.use('/api/auth/user', require('./routes/user-auth.routes'));
app.use('/api/announcements', require('./routes/announcement.routes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/students', require('./routes/student.routes'));

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