const express = require("express");
const path = require("path");
const contactRoutes = require("./routes/contactRoutes");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/contacts", contactRoutes);

// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });