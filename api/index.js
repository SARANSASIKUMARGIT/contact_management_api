const mongoose = require("mongoose");
const app = require("../server");
const mongoUri = process.env.MONGO_URI;

async function connectToDatabase() {
  if (!mongoUri) {
    console.error("MONGO_URI is not set. The API will fail without it.");
    return;
  }
  
  if (mongoose.connection.readyState === 1) {
    return;
  }
  if (mongoose.connection.readyState === 2) {
    return mongoose.connection.asPromise();
  }
  
  return mongoose.connect(mongoUri, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}


connectToDatabase().catch((err) => {
  console.error("Error connecting to MongoDB in serverless entry:", err && err.message);
});


module.exports = app;
