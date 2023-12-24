require('dotenv').config(); // Load environment variables from a .env file
const nodemailer = require("nodemailer");
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // Replace with your email service provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

function generateRandomToken(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        token += charset[randomIndex];
    }

    return token;
}

// Usage example:
const tokenLength = 20; // Adjust the length as needed
const randomToken = generateRandomToken(tokenLength);
console.log('Random Token:', randomToken);

// Route for sending email with URL
app.get('/send-url-email', async (req, res) => {
    try {
        const email = 'qureshiowais91@gmail.com';
        const resetToken = generateRandomToken(tokenLength);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset',
            html: `
            <p>Click the link below to reset your password:</p>
            <a href="https://resetpassword91.netlify.app/validate-url-email/${resetToken}">Reset Password</a>
        `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

app.post('/validate-url-email', async (req, res) => {
  
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
