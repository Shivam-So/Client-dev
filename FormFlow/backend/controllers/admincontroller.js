const User = require("../models/User");
const bcrypt = require("bcrypt");
const sendWelcomeEmail = require("../utils/mailer");

exports.createEmployee = async (req, res) => {
    try {
        const { name, email, contact } = req.body;

        if (!name || !email || !contact) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const rawname = name.replaceAll(" ", "")
        const plainPassword = `${rawname}@123`
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        const user = await User.create({
            name,
            email,
            contact,
            password: hashedPassword,
            role: "employee"
        });

        await sendWelcomeEmail(email, name, plainPassword);

        res.status(201).json({ success: true, message: "Employee created & email sent", data: user });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error creating employee" });
    }
};

exports.getEmployees = async (req, res) => {
    try {
        const users = await User.find({ role: "employee" })
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, count: users.length, data: users });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error fetching employees" });
    }
};

exports.getSingleEmployee = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: "Employee not found" });
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error fetching employee" });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const { name, email, contact } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { name, email, contact }, { new: true });
        if (!user) return res.status(404).json({ success: false, message: "Employee not found" });
        res.status(200).json({ success: true, message: "Employee updated successfully", data: user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error updating employee" });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: "Employee not found" });
        res.status(200).json({ success: true, message: "Employee deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Error deleting employee" });
    }
};