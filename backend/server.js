// const express=require("express")
// const dotenv=require("dotenv");
// const mongoose=require("mongoose");
// const connectDB=require('./config/db.js');
// const cors=require("cors");
// const cookieParser=require("cookie-parser");

// dotenv.config();
// connectDB();

// const app=express();
// app.use(express.json());
// app.use(cors());
// app.use("./api/auth",authRoutes);
// const PORT=process.env.PORT||5000;
// app.listen(PORT,()=>{
//     console.log(`server Runnig on ${PORT}`);
// })



const dotenv = require("dotenv");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Authentication API Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});