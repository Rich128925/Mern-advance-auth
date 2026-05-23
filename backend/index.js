import "./config.js";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Render provides PORT automatically
const PORT = process.env.PORT || 5000;

// ✅ CORS setup
const isDev = process.env.NODE_ENV === "development";

const corsOptions = isDev
  ? {
      origin: true,
      credentials: true,
    }
  : {
      origin: process.env.CLIENT_URL,
      credentials: true,
    };

// ✅ Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRoutes);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// ✅ Serve frontend in production (optional)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "frontend", "dist", "index.html")
    );
  });
}

// ✅ Connect DB first
connectDB();

// ✅ Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});