const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
exports.register = async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const { name, email, password } = req.body;

        console.log(name, email, password);

        // rest of your code...
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log("User already exists");
            return res.status(400).json({
                success: false,
                message: "User already registered",
            });
        }

        console.log("Creating new user...");

        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpiry,
            isVerified: false,
        });

        await newUser.save();

        await sendEmail(
            email,
            "Email Verification OTP",
            `Your OTP is ${otp}. It is valid for 10 minutes.`
        );


        return res.status(201).json({
            success: true,
            message: "Registration successful. OTP sent to your email.",
        });

    } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message
    });
}
};

exports.verifyOTP = async (req, res) => {
    try {

        const { email, otp } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (existingUser.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        if (existingUser.otpExpiry < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP Expired",
            });
        }

        existingUser.isVerified = true;
        existingUser.otp = null;
        existingUser.otpExpiry = null;

        await existingUser.save();

        return res.status(200).json({
            success: true,
            message: "Email Verified Successfully",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};

/* ===========================
   LOGIN
=========================== */

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (!existingUser.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Please verify your email first",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password",
            });
        }        const accessToken = jwt.sign(
            {
                id: existingUser._id,
                email: existingUser.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m",
            }
        );
        const refreshToken = jwt.sign(
            {
                id: existingUser._id,
            },
            process.env.REFRESH_SECRET,
            {
                expiresIn: "7d",
            }
        );
        existingUser.refreshToken = refreshToken;

        await existingUser.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
          secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token: accessToken,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};

/* ===========================
   LOGOUT
=========================== */

exports.logout = async (req, res) => {
    try {

        const existingUser = await User.findById(req.user.id);

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        existingUser.refreshToken = null;

        await existingUser.save();

        res.clearCookie("refreshToken");

        return res.status(200).json({
            success: true,
            message: "Logout Successful",
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};

exports.refreshToken = async (req, res) => {
    try {

        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "No Refresh Token",
            });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET
        );

        const existingUser = await User.findById(decoded.id);

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (existingUser.refreshToken !== refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid Refresh Token",
            });
        }

        const accessToken = jwt.sign(
            {
                id: existingUser._id,
                email: existingUser.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m",
            }
        );

        return res.status(200).json({
            success: true,
            token: accessToken,
        });

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Refresh Token Expired",
        });

    }
};
/* ===========================
   RESEND OTP
=========================== */

exports.resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (existingUser.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Email already verified",
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        existingUser.otp = otp;
        existingUser.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        await existingUser.save();

        await sendEmail(
            email,
            "New Verification OTP",
            `Your new OTP is ${otp}. It is valid for 10 minutes.`
        );

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};

/* ===========================
   GET PROFILE
=========================== */

exports.getProfile = async (req, res) => {
    try {

        const existingUser = await User.findById(req.user.id)
            .select("-password -otp -otpExpiry -refreshToken");

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user: existingUser,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};

/* ===========================
   FORGOT PASSWORD
=========================== */

exports.forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        existingUser.otp = otp;
        existingUser.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        await existingUser.save();

        await sendEmail(
            email,
            "Password Reset OTP",
            `Your OTP is ${otp}. It is valid for 10 minutes.`
        );

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};

/* ===========================
   RESET PASSWORD
=========================== */

exports.resetPassword = async (req, res) => {
    try {

        const { email, otp, newPassword } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (existingUser.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        if (existingUser.otpExpiry < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP Expired",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        existingUser.password = hashedPassword;
        existingUser.otp = null;
        existingUser.otpExpiry = null;

        await existingUser.save();

        return res.status(200).json({
            success: true,
            message: "Password Reset Successfully",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};

/* ===========================
   CHANGE PASSWORD
=========================== */

exports.changePassword = async (req, res) => {
    try {

        const { currentPassword, newPassword } = req.body;

        const existingUser = await User.findById(req.user.id);

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(
            currentPassword,
            existingUser.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect",
            });
        }

        const samePassword = await bcrypt.compare(
            newPassword,
            existingUser.password
        );

        if (samePassword) {
            return res.status(400).json({
                success: false,
                message: "New password cannot be the same as the current password",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        existingUser.password = hashedPassword;

        await existingUser.save();

        return res.status(200).json({
            success: true,
            message: "Password Changed Successfully",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};

