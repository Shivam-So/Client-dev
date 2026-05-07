const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    const { name, email, password, contact } = req.body;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: "Password must have uppercase, lowercase, and a special character"
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hash,
        contact
    });


    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({
        message: "User registered",
        token,
        user: {
            id: user._id,
            role: user.role
        },
        isProfileCompleted: user.isProfileCompleted,
        isFormSubmitted: user.isFormSubmitted
    });
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ msg: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(400).json({ msg: "Wrong password" });
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({
        token,
        user: {
            id: user._id,
            role: user.role
        },
        isProfileCompleted: user.isProfileCompleted,
        isFormSubmitted: user.isFormSubmitted
    });
};