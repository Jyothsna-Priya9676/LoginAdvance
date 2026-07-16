const dns = require("dns");

// Force IPv4 (fix Render IPv6 SMTP issue)
dns.setDefaultResultOrder("ipv4first");

const nodemailer = require("nodemailer");


const sendEmail = async (to, subject, text) => {

    try {

        console.log("EMAIL:", process.env.EMAIL);
        console.log(
            "APP_PASSWORD:",
            process.env.APP_PASSWORD ? "Loaded" : "Missing"
        );


        const transporter = nodemailer.createTransport({

            host: "smtp.gmail.com",

            port: 587,

            secure: false,

            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD
            },

            tls: {
                rejectUnauthorized: false
            }

        });


        console.log("Sending email...");


        const info = await transporter.sendMail({

            from: process.env.EMAIL,

            to: to,

            subject: subject,

            text: text

        });


        console.log("Email sent successfully:", info.messageId);


        return info;


    } catch (error) {

        console.error("EMAIL ERROR:", error);

        throw error;

    }

};


module.exports = sendEmail;