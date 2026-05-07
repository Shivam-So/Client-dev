const router = require("express").Router();
const { signup, login } = require("../controllers/authcontroller.js");
const auth = require("../middleware/auth");
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/signup", signup);
router.post("/login", login);


router.post("/change-password", auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id);


        const match = await bcrypt.compare(currentPassword, user.password);
        if (!match) {
            return res.status(400).json({ message: "Current password is incorrect!" });
        }


        const hashed = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(req.user.id, { password: hashed });

        res.status(200).json({ success: true, message: "Password updated successfully" });

    } catch (err) {
        res.status(500).json({ message: "Error updating password" });
    }
});

module.exports = router;