const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    q1: String,
    q2: [String],
    q3: String,

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model("Form", formSchema);