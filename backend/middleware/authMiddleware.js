// const jwt=require("jsonwebtoken");
// const authMiddleware=(req,res,next)=>{
//     try{
//         const authHeader= req.headers.authorization;
//         if(!authHeader){
//             return res.status(401).json({
//                 message:"No Token Provided"
//             });
//         }
//         const token=authHeader.split(" ")[1];
//         const decoded=jwt.verify(token,process.env.JWT_SECRET);
//         //verif returns id,email,iat...}
//         req.user=decoded;
//         next();

//     }catch(err){
//         return res.status(401).json({
//             message:"Invalid Token"
//         });
//     }
// };
// //localStorage.setItem("token", token);
// /*Later react sends like this:"fetch("/profile",{
// headers:{
// Authorization:`Bearer ${token}`
// }
// })*/
// /*For token we have to pass this for every requset:"headers: {
//     Authorization: `Bearer ${token}`
//     React has to manually attach the token.
// }*/

// //with cookies
// /* res.cookie("token", token, {
//     httpOnly: true,
//     secure: false,      // true in production with HTTPS
//     maxAge: 24 * 60 * 60 * 1000
// });

// return res.json({
//     message: "Login Successful"
// });

// const token = req.cookies.token;
// exports.logout = (req, res) => {

//     res.clearCookie("token");

//     res.json({
//         message: "Logout Successful"
//     });

// }; */
// // exports.getProfile = async (req, res) => {

// //     try {

// //         const user = await User.findById(req.user.id).select("-password");

// //         if (!user) {
// //             return res.status(404).json({
// //                 message: "User not found"
// //             });
// //         }

// //         return res.status(200).json({
// //             success: true,
// //             user
// //         });

// //     } catch (error) {

// //         console.log(error);

// //         return res.status(500).json({
// //             message: "Server Error"
// //         });

// //     }

// // };
// // exports.forgotPassword = async (req, res) => {

// //     try {

// //         const { email } = req.body;

// //         // Check if user exists
// //         const user = await User.findOne({ email });

// //         if (!user) {
// //             return res.status(404).json({
// //                 success: false,
// //                 message: "User not found"
// //             });
// //         }

// //         // Generate OTP
// //         const otp = Math.floor(100000 + Math.random() * 900000).toString();

// //         // OTP expires in 10 minutes
// //         const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

// //         // Save OTP
// //         user.otp = otp;
// //         user.otpExpiry = otpExpiry;

// //         await user.save();

// //         // Send Email
// //         await transporter.sendMail({
// //             from: process.env.EMAIL,
// //             to: email,
// //             subject: "Password Reset OTP",
// //             text: `Your OTP is ${otp}. It expires in 10 minutes.`
// //         });

// //         return res.status(200).json({
// //             success: true,
// //             message: "OTP sent successfully"
// //         });

// //     } catch (error) {

// //         console.log(error);

// //         return res.status(500).json({
// //             success: false,
// //             message: "Server Error"
// //         });

// //     }

// // };
// // exports.resetPassword = async (req, res) => {

// //     try {

// //         const { email, otp, newPassword } = req.body;

// //         // Find user
// //         const user = await User.findOne({ email });

// //         if (!user) {
// //             return res.status(404).json({
// //                 success: false,
// //                 message: "User not found"
// //             });
// //         }

// //         // Check OTP
// //         if (user.otp !== otp) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message: "Invalid OTP"
// //             });
// //         }

// //         // Check OTP expiry
// //         if (user.otpExpiry < Date.now()) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message: "OTP Expired"
// //             });
// //         }

// //         // Hash new password
// //         const hashedPassword = await bcrypt.hash(newPassword, 10);

// //         // Update password
// //         user.password = hashedPassword;

// //         // Remove OTP
// //         user.otp = null;
// //         user.otpExpiry = null;

// //         await user.save();

// //         return res.status(200).json({
// //             success: true,
// //             message: "Password Reset Successfully"
// //         });

// //     } catch (error) {

// //         console.log(error);

// //         return res.status(500).json({
// //             success: false,
// //             message: "Server Error"
// //         });

// //     }

// // };
// // exports.resendOTP = async (req, res) => {

// //     try {

// //         const { email } = req.body;

// //         // Find User
// //         const user = await User.findOne({ email });

// //         if (!user) {
// //             return res.status(404).json({
// //                 success: false,
// //                 message: "User not found"
// //             });
// //         }

// //         // If already verified
// //         if (user.isVerified) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message: "Email already verified"
// //             });
// //         }

// //         // Generate New OTP
// //         const otp =
// //             Math.floor(100000 + Math.random() * 900000).toString();

// //         // New Expiry
// //         const otpExpiry =
// //             new Date(Date.now() + 10 * 60 * 1000);

// //         // Save
// //         user.otp = otp;
// //         user.otpExpiry = otpExpiry;

// //         await user.save();

// //         // Send Email
// //         await transporter.sendMail({

// //             from: process.env.EMAIL,

// //             to: email,

// //             subject: "New Verification OTP",

// //             text: `Your new OTP is ${otp}`

// //         });

// //         return res.status(200).json({

// //             success: true,

// //             message: "New OTP Sent"

// //         });

// //     }

// //     catch (error) {

// //         console.log(error);

// //         return res.status(500).json({

// //             success: false,

// //             message: "Server Error"

// //         });

// //     }

// // };
// // exports.changePassword = async (req, res) => {

// //     try {

// //         const { currentPassword, newPassword } = req.body;

// //         // Logged-in user's ID from JWT
// //         const user = await User.findById(req.user.id);

// //         if (!user) {
// //             return res.status(404).json({
// //                 success: false,
// //                 message: "User not found"
// //             });
// //         }

// //         // Compare current password
// //         const isMatch = await bcrypt.compare(
// //             currentPassword,
// //             user.password
// //         );

// //         if (!isMatch) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message: "Current password is incorrect"
// //             });
// //         }

// //         // Optional: prevent using the same password
// //         const samePassword = await bcrypt.compare(
// //             newPassword,
// //             user.password
// //         );

// //         if (samePassword) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message: "New password cannot be the same as the current password"
// //             });
// //         }

// //         // Hash new password
// //         const hashedPassword = await bcrypt.hash(newPassword, 10);

// //         // Update password
// //         user.password = hashedPassword;

// //         await user.save();

// //         return res.status(200).json({
// //             success: true,
// //             message: "Password changed successfully"
// //         });

// //     } catch (error) {

// //         console.log(error);

// //         return res.status(500).json({
// //             success: false,
// //             message: "Server Error"
// //         });

// //     }

// // };
// module.exports=authMiddleware;


const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check if token exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "No token provided",
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Save user info in request
        req.user = decoded;

        next();
    } catch (error) {
        console.log(error);

        return res.status(401).json({
            success: false,
            message: "Invalid or Expired Token",
        });
    }
};

module.exports = authMiddleware;