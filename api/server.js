import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { db } from "./database/db.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import uploadRoutes from "./routes/uploads.js";
import notificationRoutes from "./routes/notification.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5003;
const __dirname = path.resolve();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/notification", notificationRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "/client", "/dist", "/index.html"));
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
