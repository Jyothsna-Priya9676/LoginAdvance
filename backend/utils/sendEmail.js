const dns = require("dns");

// Fix Render SMTP IPv6 issue
dns.setDefaultResultOrder("ipv4first");

const nodemailer = require("nodemailer");


const sendEmail = async (to, subject, text) => {

    console.log("EMAIL:", process.env.EMAIL);
    console.log(
        "APP_PASSWORD:",
        process.env.APP_PASSWORD ? "Loaded" : "Missing"
    );


    const transporter = nodemailer.createTransport({

        service: "gmail",

        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD
        },

        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000

    });


    try {

        console.log("Sending email...");


        const info = await transporter.sendMail({

            from: process.env.EMAIL,

            to: to,

            subject: subject,

            text: text

        });


        console.log(
            "Email sent successfully:",
            info.messageId
        );


        return info;


    } catch(error) {

        console.error(
            "EMAIL ERROR:",
            error.message
        );

        throw error;

    }

};


module.exports = sendEmail;