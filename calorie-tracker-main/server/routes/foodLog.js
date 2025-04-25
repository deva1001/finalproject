const express = require('express');
const router = express.Router();
const FoodLog = require('../models/FoodLog');
const auth = require('../middleware/auth');

// POST route to save a food log
router.post('/', auth, async (req, res) => {
  const { name, amount, calories } = req.body;

  try {
    const newLog = new FoodLog({
      userId: req.user.id,
      name,
      amount,
      calories,
    });

    await newLog.save();
    res.status(201).json({ message: 'Food logged successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error logging food', error: err.message });
  }
});

// GET route to fetch food logs for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const logs = await FoodLog.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching logs', error: err.message });
  }
});

module.exports = router;
