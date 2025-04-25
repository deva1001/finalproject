const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const transporter = require('../mailer'); // Nodemailer transporter

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret_key';

// In-memory OTP store: { email: { otp, expiresAt } }
const otpStore = {};

// -------------------- REGISTER --------------------
router.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// -------------------- LOGIN --------------------
router.post('/login', async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// -------------------- FORGOT PASSWORD (Send OTP) --------------------
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpStore[email] = { otp, expiresAt };

    await transporter.sendMail({
      from: 'saikiran929o38@gmail.com',
      to: email,
      subject: 'Your OTP for Password Reset - Calorie Tracker',
      html: `<p>Your OTP is: <b>${otp}</b></p><p>It is valid for 10 minutes.</p>`
    });

    res.json({ message: 'OTP has been sent to your email.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Error sending OTP' });
  }
});

// -------------------- VERIFY OTP --------------------
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  if (!record) return res.status(400).json({ message: 'OTP not requested' });
  if (Date.now() > record.expiresAt) return res.status(400).json({ message: 'OTP expired' });
  if (otp !== record.otp) return res.status(400).json({ message: 'Invalid OTP' });

  // Issue temporary token after successful OTP verification
  const user = await User.findOne({ email });
  const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '10m' });

  // Invalidate OTP
  delete otpStore[email];

  res.json({ message: 'OTP verified successfully', token });
});

// -------------------- RESET PASSWORD --------------------
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});

module.exports = router;
