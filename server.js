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
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

module.exports = app;
