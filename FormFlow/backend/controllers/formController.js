const Form = require("../models/form");
const User = require("../models/user");

exports.submitForm = async (req, res) => {

    try {
        const { q1, q2, q3 } = req.body;

        if (!q1 || !q2.length || !q3) {
            return res.status(400).json({ message: "All questions required" });
        }

        const form = await Form.create({
            q1,
            q2,
            q3,
            userId: req.user.id
        });


        await User.findByIdAndUpdate(req.user.id, {
            isFormSubmitted: true
        });

        res.json({ message: "Form submitted", form });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error submitting form" });
    }

};

exports.getForms = async (req, res) => {
    try {
        const forms = await Form.find()
            .populate("userId", "name email")
            .sort({ createdAt: -1 });

        res.json(forms);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching forms" });
    }
};