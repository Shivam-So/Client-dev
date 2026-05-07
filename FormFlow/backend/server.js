require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const profileRoutes = require("./routes/profileRoutes");
const formRoutes = require("./routes/formRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use("/api/profile", profileRoutes);
app.use("/api/form", formRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", require("./routes/adminRoutes"));



connectDB();


app.use("/api/auth", require("./routes/authroutes"));

app.get("/", (req, res) => {
    res.send("API running ");
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
});