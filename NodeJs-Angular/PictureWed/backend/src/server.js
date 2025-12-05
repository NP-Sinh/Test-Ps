import express from "express";
import cors from "cors";
import { connectDB } from "./config/dbConfig.js";
import dotenv from "dotenv";
import pictureRouters from "./routers/pictureRouters.js";
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 8000
const app =  express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/pictures", pictureRouters);
app.use("/assets", express.static("assets"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;