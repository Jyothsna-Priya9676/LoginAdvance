const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {

    try {

        const transporter = nodemailer.createTransport({

            service: "gmail",

            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD
            },

            pool: true,

            maxConnections: 1,

            connectionTimeout: 30000,

            socketTimeout: 30000

        });


        console.log("Checking SMTP...");

        await transporter.verify();

        console.log("SMTP READY");


        const mail = await transporter.sendMail({

            from: process.env.EMAIL,

            to,

            subject,

            text

        });


        console.log(
            "MAIL SENT:",
            mail.messageId
        );


    } catch(error){

        console.log(
            "EMAIL ERROR:",
            error
        );

        throw error;

    }

};


module.exports = sendEmail;