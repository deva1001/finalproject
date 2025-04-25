// mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // use TLS
  auth: {
    user: 'saikiran929o38@gmail.com',
    pass: 'rrxedrvltbrjovzx',
  },
});

module.exports = transporter; // <-- correct way to export
