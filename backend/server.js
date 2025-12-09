

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const errorHandler = require("./middleware/errorHandler");
const { registerRoutes } = require("./routes");

const authRoutes = require("./routes/auth");
const donationsRoutes = require("./routes/donations");
const userRoutes = require("./routes/users");
const doctorsRoutes = require("./routes/doctors");
const hospitalRoutes = require("./routes/hospital");
const ngoRoutes = require("./routes/ngo");
const bookingsRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/payment");
const campsRoutes = require("./routes/camps");
const videoCallRoutes = require("./routes/videoCall");

const app = express();
const PORT = process.env.PORT || 5001;

// Create uploads folder if missing
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

// FIXED CORS FOR MOBILE
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorsRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/ngos", ngoRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/camps", campsRoutes);
app.use("/api/video", videoCallRoutes);
app.get("/", (req, res) => {
  res.send("✅ MedConnect Backend is Running");
});


// Custom report/chat
registerRoutes(app);

// Global error
app.use(errorHandler);

// DB connect
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Hotspot-safe server binding
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running http://0.0.0.0:${PORT}`);
}); 
