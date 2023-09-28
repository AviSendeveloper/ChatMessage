const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        isOnline: {
            type: Boolean,
            default: 0,
        },
        image: {
            type: String,
            defailt: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("User", userSchema);
