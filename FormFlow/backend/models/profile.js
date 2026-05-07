const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Profile", profileSchema);