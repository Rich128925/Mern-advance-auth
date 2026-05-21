import mongoose from "mongoose";
import dns from "node:dns/promises";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URL || process.env.MONGO_URI;
    if (!mongoUri) throw new Error("MONGODB_URL is not defined in .env");

    // Override system DNS — fixes Atlas SRV lookup failures on some networks
    dns.setServers(["1.1.1.1", "8.8.8.8"]);

    mongoose.connection.on("connected", () => {
      console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err.message);
    });

    await mongoose.connect(mongoUri);
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;