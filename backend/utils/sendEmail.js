const nodemailer = require("nodemailer");


const sendEmail = async (to, subject, text) => {

    try {

        const transporter = nodemailer.createTransport({

            service: "gmail",

            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD
            }

        });


        const info = await transporter.sendMail({

            from: process.env.EMAIL,

            to: to,

            subject: subject,

            text: text

        });


        console.log("Email sent:", info.messageId);

        return info;


    } catch(error) {

        console.log("EMAIL ERROR:", error);

        throw error;

    }

};


module.exports = sendEmail;