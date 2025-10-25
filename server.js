const express = require("express");
const path = require("path");
const contactRoutes = require("./routes/contactRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/contacts", contactRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;

if (require.main === module) {
  const mongoose = require("mongoose");
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("MONGO_URI not set in environment. See .env or set env var.");
    process.exit(1);
  }

  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("MongoDB connected (local)");
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err.message);
      process.exit(1);
    });
}
