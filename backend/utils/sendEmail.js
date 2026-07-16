const dns = require("dns");

// Force IPv4 for Gmail SMTP on Render
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

            family: 4,

            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD
            },

            tls: {
                rejectUnauthorized: false
            },

            connectionTimeout: 30000,
            greetingTimeout: 30000,
            socketTimeout: 30000

        });


        console.log("Checking SMTP connection...");


        await transporter.verify();


        console.log("SMTP connection successful");


        const info = await transporter.sendMail({

            from: process.env.EMAIL,

            to: to,

            subject: subject,

            text: text

        });


        console.log(
            "Email sent:",
            info.messageId
        );


        return info;


    } catch(error) {

        console.log(
            "EMAIL ERROR:",
            error.message
        );

        throw error;

    }

};


module.exports = sendEmail;