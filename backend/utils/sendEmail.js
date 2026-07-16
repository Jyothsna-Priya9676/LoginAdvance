const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {

    try {

        const transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            auth:{
                user:process.env.EMAIL,
                pass:process.env.APP_PASSWORD
            },
            family:4,
            tls:{
                rejectUnauthorized:false
            }
        });


        const info = await transporter.sendMail({

            from:process.env.EMAIL,
            to,
            subject,
            text

        });


        console.log("Email sent:",info.messageId);


    } catch(error){

        console.log("EMAIL ERROR:",error);
        throw error;

    }

};


module.exports=sendEmail;