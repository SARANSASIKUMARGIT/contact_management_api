const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel");

// Get all contacts
router.get("/", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

// Create new contact
router.post("/", async (req, res) => {
  const { name, email, phone, messages } = req.body;
  const contact = new Contact({ name, email, phone, messages });
  await contact.save();
  res.status(201).json(contact);
});

// Get single contact
router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// Update contact
router.put("/:id", async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Contact not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// Delete contact
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

module.exports = router;
