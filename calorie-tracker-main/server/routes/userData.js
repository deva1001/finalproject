const express = require('express');
const router = express.Router();
const UserData = require('../models/UserData');
const auth = require('../middleware/auth'); // <-- make sure path is correct

// GET user data (protected route)
router.get('/', auth, async (req, res) => {
  try {
    const data = await UserData.findOne({ userId: req.user.id }); // req.user.id from token
    if (!data) return res.status(404).json({ message: 'No data found for this user' });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data', error: err.message });
  }
});

// POST or update user data (protected route)
router.post('/', auth, async (req, res) => {
  const { height, weight, age, goal, DCI } = req.body;
  const userId = req.user.id;

  try {
    const existing = await UserData.findOne({ userId });

    if (existing) {
      existing.height = height;
      existing.weight = weight;
      existing.age = age;
      existing.goal = goal;
      existing.DCI = DCI;
      await existing.save();
      res.status(200).json({ message: 'Data updated successfully' });
    } else {
      const newData = new UserData({ userId, height, weight, age, goal, DCI });
      await newData.save();
      res.status(201).json({ message: 'Data saved successfully' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
