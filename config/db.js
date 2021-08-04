const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoDbUri');

const connectDB = async () => {

    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("MongoDB connected successfully")

    } catch (error) {
        console.log(error.message)
        process.exit(1);
    }

}

module.exports = connectDB;

