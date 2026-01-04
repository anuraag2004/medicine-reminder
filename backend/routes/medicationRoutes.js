const express = require('express');
const router = express.Router();
const Medication = require('../models/Medication'); // Ensure the 'models' folder exists too!

// POST: Save a new medicine
router.post('/', async (req, res) => {
  try {
    const newMedication = new Medication(req.body);
    const savedMedication = await newMedication.save();
    res.status(201).json(savedMedication);
  } catch (error) {
    res.status(500).json({ message: 'Error saving medicine', error: error.message });
  }
});

// GET: Get all medicines
router.get('/', async (req, res) => {
  try {
    const medications = await Medication.find().sort({ createdAt: -1 });
    res.json(medications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medicines' });
  }
});

module.exports = router;
// ... (Keep your POST and GET routes here) ...

// DELETE: Delete a medicine by ID
// This is the missing piece!
router.delete('/:id', async (req, res) => {
  try {
    const deletedMed = await Medication.findByIdAndDelete(req.params.id);
    if (!deletedMed) {
      return res.status(404).json({ message: 'Medication not found' });
    }
    res.json({ message: 'Medication deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;