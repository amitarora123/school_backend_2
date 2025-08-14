import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser"

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());
app.use(morgan("dev"))
app.use(cors())

export default app;



