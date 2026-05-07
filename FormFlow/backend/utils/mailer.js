const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendWelcomeEmail = async (toEmail, name, password) => {
    await transporter.sendMail({
        from: `"Admin Panel" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: "Welcome! Your account has been created",
        html: `
            <h2>Hello ${name}!</h2>
            <p>Your account has been created by admin.</p>
            <br/>
            <p><b>Email:</b> ${toEmail}</p>
            <p><b>Password:</b> ${password}</p>
            <br/>
            <p>Please login and change your password.</p>
        `
    });
};

module.exports = sendWelcomeEmail;