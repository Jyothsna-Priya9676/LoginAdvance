const nodemailer = require("nodemailer");


const sendEmail = async (to, subject, text) => {

    try {

        const transporter = nodemailer.createTransport({

            host: "smtp.gmail.com",

            port: 587,

            secure: false,

            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD
            },

            tls: {
                ciphers: "SSLv3"
            }

        });


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