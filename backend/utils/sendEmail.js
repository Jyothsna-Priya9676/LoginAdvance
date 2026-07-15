// const nodemailer=require("nodemailer");
// const sendEmail=async(to,subject,text)=>{
//     try{
//         const transporter=nodemailer.createTransport({
//             service:"gmail",
//             auth:{
//                 user:process.env.EMAIL,
//                 pass:process.env.APP_PASSWORD
//             }
//         });
//         const mailOptions={
//             from:process.env.EMAIL,
//             to,subject,text
//         }
//         await transporter.sendMail(mailOptions);
//         console.log("Email sent successfully");
//     }
//     catch(err){
//         console.log(err);
//     }
// }
// module.exports=sendEmail





// const nodemailer = require("nodemailer");

// const sendEmail = async (to, subject, text) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL,
//                 pass: process.env.APP_PASSWORD,
//             },
//         });

//         const mailOptions = {
//             from: process.env.EMAIL,
//             to,
//             subject,
//             text,
//         };

//         await transporter.sendMail(mailOptions);

//         console.log("Email sent successfully");
//     } catch (error) {
//         console.log("Email Error:", error);
//         throw error;
//     }
// };

// module.exports = sendEmail;





const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
    try {

        const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

        const mailOptions = {
            from: process.env.EMAIL,
            to: to,
            subject: subject,
            text: text,
        };


        await transporter.sendMail(mailOptions);

        console.log("Email sent successfully");

    } catch (error) {

        console.log("Email Error:", error);
        throw error;

    }
};


module.exports = sendEmail;