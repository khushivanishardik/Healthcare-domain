require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (adjust if needed)
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/doctor-auth", require("./routes/doctorAuthRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.log("❌ MongoDB error:", err));

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});