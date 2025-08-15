import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// Route imports
import schoolRoutes from "./routes/school.route";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/health-status", (req, res) => {
  res.send("Service is live");
});

app.use("/api/school", schoolRoutes);
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);
    res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
      error: process.env.NODE_ENV === "production" ? {} : err,
    });
  }
);
export default app;
