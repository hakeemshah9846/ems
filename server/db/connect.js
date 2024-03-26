const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


async function connect () {
    try {
       await mongoose.connect(process.env.DB_URL);
       console.log("Database connection established...");
    } catch (error) {
        console.log("Database connectionn error : ", error);
    }
}

module.exports = {
    connect,
}
