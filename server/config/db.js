import mongoose from 'mongoose';

global.isMongoConnected = false;

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/arkhe_real_estate';
  
  try {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
    });
    
    global.isMongoConnected = true;
    console.log(`\x1b[32m[Database] MongoDB Connected: ${conn.connection.host}\x1b[0m`);
  } catch (error) {
    global.isMongoConnected = false;
    console.error(`\x1b[31m[Database] MongoDB Connection Failed: ${error.message}\x1b[0m`);
    console.warn(`\x1b[33m[Database] Running in Fallback Mode (serving local/memory data)\x1b[0m`);
  }
};

export default connectDB;
