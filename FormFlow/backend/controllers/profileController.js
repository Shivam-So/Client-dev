const Profile = require("../models/profile");
const User = require("../models/User");

exports.saveProfile = async (req, res) => {
    try {
        const { name, email, contact } = req.body;

        const profile = await Profile.create({
            name,
            email,
            contact,
            userId: req.user.id,
            contact: req.body.contact
        });


        await User.findByIdAndUpdate(req.user.id, {
            isProfileCompleted: true
        });

        res.json({ message: "Profile saved", profile });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error saving profile" });
    }
};