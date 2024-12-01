import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import cookieParser from "cookie-parser";

// parsers
app.use(express.json());

app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "https://fit-zone-three.vercel.app",
];
app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  })
);

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
