// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🔥 Middleware
app.use(cors());
app.use(express.json());

// 🔥 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// 🔥 Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/doctor-auth", require("./routes/doctorAuthRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));

// 🔥 Default Route
app.get("/", (req, res) => {
  res.send("🚀 Healthcare API Running");
});

// 🔥 Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});