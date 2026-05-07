const express = require("express");
const router = express.Router();
const Form = require("../models/form");
const User = require("../models/User");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const adminOrEmployee = require("../middleware/adminOrEmployee");

const {
    createEmployee, getEmployees,
    getSingleEmployee, updateEmployee, deleteEmployee
} = require("../controllers/admincontroller");


router.get("/users", auth, adminOrEmployee, async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching users" });
    }
});

router.get("/forms", auth, adminOrEmployee, async (req, res) => {
    try {
        const forms = await Form.find()
            .populate("userId", "name email")
            .sort({ _id: -1 });
        const formsWithDate = forms.map(f => ({
            ...f.toObject(),
            createdAt: f._id.getTimestamp()
        }));
        res.status(200).json({ success: true, count: formsWithDate.length, data: formsWithDate });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching forms" });
    }
});

router.get("/dashboard", auth, adminOrEmployee, (req, res) => {
    res.status(200).json({ success: true, message: "Dashboard data" });
});

router.get("/recent-users", auth, adminOrEmployee, async (req, res) => {
    try {
        const users = await User.find({ isFormSubmitted: true })
            .sort({ createdAt: -1 }).limit(4);
        res.status(200).json({ success: true, data: users });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching recent users" });
    }
});

router.get("/employee/dashboard", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error" });
    }
});

router.get("/employee/stats", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        res.status(200).json({ success: true, data: { user } });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error" });
    }
});


router.get("/employees", auth, adminOrEmployee, getEmployees);
router.get("/employees/:id", auth, adminOrEmployee, getSingleEmployee);


router.post("/create-employee", auth, admin, createEmployee);
router.put("/employees/:id", auth, admin, updateEmployee);
router.delete("/employees/:id", auth, admin, deleteEmployee);

module.exports = router;