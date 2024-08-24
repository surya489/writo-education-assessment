const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Mock database
const users = new Map(); // Key: email, Value: { password, otp }

// Email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Signup endpoint
app.post('/api/signup', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    users.set(email, { password, otp });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to send OTP email.' });
        }
        res.status(200).json({ message: 'OTP sent successfully.' });
    });
});

// OTP verification endpoint
app.post('/api/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    const user = users.get(email);

    if (user && user.otp === otp) {
        res.status(200).json({ message: 'OTP verified successfully.' });
        user.otp = null;
    } else {
        res.status(400).json({ error: 'Incorrect OTP.' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
