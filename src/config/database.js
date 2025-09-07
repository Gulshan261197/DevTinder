const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://Gulshan8757:Qwerty123@cluster1.c1drq39.mongodb.net/devTinder"
    )
}

module.exports = connectDB;
