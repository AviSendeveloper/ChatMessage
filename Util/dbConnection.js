const mongoose = require("mongoose");
const url = process.env.DB_URL || "mongodb://localhost:27017/ChatMassanger";

module.exports = async () => {
    try {
        const connection = await mongoose.connect(url);
        return url;
    } catch (error) {
        throw new Error(`connection can not be establised with url: ${url}`);
    }
};
