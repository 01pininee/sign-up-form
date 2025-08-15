import req from "express/lib/request";
import { preinitModule } from "react-dom";

const form = document.getElementById('signupForm');
const username = document.getElelmentById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const strengthBar = document.getElementById('strengthBar');
const submitBtn = document.getElementById('submitBtn');
const toggleBtn = document.getElementById('themeToggle');

const crypto = require('crypto');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = crypto.randomBytes(32).toString('hex');
        const user = new UserActivation({
            username,
            email,
            pass: hashedPassword,
            verificatinToken: token
        });

        await user.save();

        const verification = `http://http://127.0.0.1:5500/index.html/api/verify/${token}`;
        await transporter.sendMail({
           from: process.env.EMAIL_USER,
           To: email,
           subject: 'verify your email',
           html
        });

        res.status(201).send('User registered successfully! Please check your email for verification link.');
    } catch (err) {
        res.status(500).send('Signup Failed');
    }
})

app.get('/api/verify/:token', async (req, res) => {
    const { token } = req.params;
    try {
        const user = await user.findOne({ verification : token });
        if (!user) return res.status(400).send('Invalid Token');

        user.verified = true;
        user.verification = undefined;
        await user.save();

        res.send('Email verify successfully!');
    } catch (err) {
        res.status(500).send('Verification Failed');
    }
});

const mongoose = required('mongoose');
const userSechema = new mongoose.Schema({
    username: string,
    email: string,
    password: string,
    verified: { type: Boolean, default: false },
    verificationToken: string
});
export default mongoose.model('user', userSchema);

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains("dark")) {
        toggleBtn.textContent = '☀️ Toggle Light Mode';
    } else {
        toggleBtn.textContent = '🌙 Toggle Dark Mode';
    }

    
})