require('dotenv').config(); // Load environment variables from a .env file
const nodemailer = require("nodemailer");
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const Redis = require("ioredis");
const { REDIS_URI } = process.env;
const renderRedis = new Redis(REDIS_URI);
const cors = require('cors');

app.use(express.json());
app.use(cors());
function generateRandomToken(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        token += charset[randomIndex];
    }

    return token;
}
const tokenLength = 20; // Adjust the length as needed

app.get("/check-email", async (req, res) => {
    try {
        const email = req.query.email;
        const value = await renderRedis.get(email);
        if (value == null) {
            renderRedis.set(email, email);// will get emaill with emaill next  time if needed   not issue as its just learning demo 
            res.status(404).json({ "msg": false });
        } else {
            res.status(201).json({ "Email": value });
        }
    } catch (error) {
        res.status(404).json({ "msg": false });
    }
})

// Route for sending email with URL
app.post('/send-url-email', async (req, res) => {
    try {
        const resetToken = generateRandomToken(8);
        const email = req.body.email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.APP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset',
            html: `
            <p>Click the link below to reset your password:</p>
            https://cutekitten.netlify.app/resetPassword/${resetToken}
        `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        res.status(200).json({ 'msg': 'Email sent successfully' });
        renderRedis.set(resetToken, email);
        console.log('Email sent: ' + resetToken + ' ' + email);


    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

app.post('/validate-token', async (req, res) => {
    try {
        const { token, userEmail, password } = req.body;
        const email = await renderRedis.get(token);

        if (email === userEmail) {
            renderRedis.del(token);
            renderRedis.set(email, password);
        } else {
            renderRedis.del(token);
            throw Error("Invalid ResetToken");

        }
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: error.message });
    }
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const DBpassword = await renderRedis.get(email);
        if (password === DBpassword) {
            res.status(200).json({ "status": true })
        }else{
            res.status(200).json({ "status": false })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});