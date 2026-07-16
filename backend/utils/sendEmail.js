const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    if (!process.env.EMAIL || !process.env.APP_PASSWORD) {
      throw new Error("Missing EMAIL or APP_PASSWORD environment variables");
    }

    // Use Gmail with SSL (port 465) — works better on Render
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });

    console.log("Checking SMTP connection...");
    await transporter.verify();
    console.log("SMTP connection successful");

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("EMAIL ERROR:", error.message);
    throw error;
  }
};

module.exports = sendEmail;
