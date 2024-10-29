import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import rutinaRouter from "./routes/rutinaRouter.js";
import ejercicioRouter from "./routes/ejercicioRouter.js";
import nivelRouter from "./routes/nivelRouter.js";
import sesionRutinaRouter from "./routes/sesionRutinaRouter.js";
import rutinaEjercicioRouter from "./routes/rutinaEjercicioRouter.js";

dotenv.config();
const port = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/rutinas", rutinaRouter);
app.use("/api/ejercicios", ejercicioRouter);
app.use("/api/niveles", nivelRouter);
app.use("/api/sesionrutinas", sesionRutinaRouter);
app.use("/api/rutinaejercicios", rutinaEjercicioRouter);

app.listen(port, () => console.log(`Server running on port: ${port}`));
