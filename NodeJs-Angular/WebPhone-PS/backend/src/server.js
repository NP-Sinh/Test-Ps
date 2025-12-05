import express from "express";
import {connectionDB} from "./config/dbconfig.js"
import cors from "cors";
import dotenv from "dotenv";
import vaiTroRouters from "./routers/vaiTroRouters.js"


dotenv.config();
const PORT = process.env.PORT || 8000
const app =  express();

connectionDB();

app.use(cors());
app.use(express.json());

app.use("/api/VaiTro", vaiTroRouters);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;