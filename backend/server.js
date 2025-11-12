// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const { registerRoutes } = require("./routes");

const authRoutes = require("./routes/auth");
const donationsRoutes = require("./routes/donations");
const userRoutes = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 5001;

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Helmet
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use('/uploads', express.static('uploads'));

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationsRoutes);
app.use("/api/users", userRoutes);

// Custom report/chat routes
(async () => {
  try {
    const server = await registerRoutes(app);
    server.listen(PORT, () =>
      console.log(`✅ Server running successfully on port ${PORT}`)
    );
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
})();

// Error handler
app.use(errorHandler);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
