const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {

    const transporter = nodemailer.createTransport({

        host: "smtp.gmail.com",

        port: 465,

        secure: true,

        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD
        },

        connectionTimeout: 20000,
        socketTimeout: 20000

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
            "Email sent:",
            info.messageId
        );


        return info;


    } catch(error){

        console.log(
            "EMAIL ERROR:",
            error.message
        );

        throw error;

    }

};


module.exports = sendEmail;