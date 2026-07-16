const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
    try {
        console.log("EMAIL:", process.env.EMAIL);
console.log("APP_PASSWORD exists:", !!process.env.APP_PASSWORD);

        const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

        const mailOptions = {
            from: process.env.EMAIL,
            to: to,
            subject: subject,
            text: text,
        };


        await transporter.sendMail(mailOptions);

        console.log("Email sent successfully");

    } catch (error) {

        console.error("Email Error:", error);
console.error("Message:", error.message);
console.error("Code:", error.code);
        throw error;

    }
};


module.exports = sendEmail;