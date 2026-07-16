const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
    try {
        console.log("EMAIL:", process.env.EMAIL);
        console.log("APP_PASSWORD:", process.env.APP_PASSWORD ? "Loaded" : "Missing");

       const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
    },
    family: 4, // Force IPv4
});

        console.log("Verifying transporter...");
        await transporter.verify();
        console.log("Transporter verified");

        console.log("Sending email...");

        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            text,
        });

        console.log("Email sent:", info.messageId);

    } catch (error) {
        console.error("EMAIL ERROR:", error);
        throw error;
    }
};

module.exports = sendEmail;