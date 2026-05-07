const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },


    password: {
        type: String,
        default: ""
    },

    isProfileCompleted: {
        type: Boolean,
        default: false
    },

    isFormSubmitted: {
        type: Boolean,
        default: false
    },

    role: {
        type: String,
        enum: ["user", "admin", "employee"],
        default: "user"
    },

    contact: {
        type: String,
        default: ""
    },

    employeeId: {
        type: String,
        unique: true,
        sparse: true
    }

}, { timestamps: true });

module.exports =
    mongoose.models.User || mongoose.model("User", UserSchema);