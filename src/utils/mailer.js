const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendEmail = async (to, subject, html) => {
    await transporter.sendMail({
        from: `"BROOKS STUDENT PORTAL - Grooming the future" <noreply@brooks@portal.com>`,
        to,
        subject,
        html
    });
}