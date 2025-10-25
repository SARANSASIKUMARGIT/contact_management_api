const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: Number, required: false },
  messages: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema, "contact_tb");
