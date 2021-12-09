const mongoose = require("mongoose");
const config = require("./config/config");
//const mongoPath = config.mongoURI;
const mongoPath = "mongodb://127.0.0.1:27017/ems";
console.log(mongoPath);
exports.connectToMongoDB = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return mongoose;
};
