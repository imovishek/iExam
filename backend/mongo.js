const mongoose = require('mongoose');
const config = require('./config/config');
const mongoPath = config.mongoURI;

exports.connectToMongoDB = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return mongoose;
}