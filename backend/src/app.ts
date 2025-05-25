import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import todoRouter from "./routes/todo.route";
import teamRouter from "./routes/team.route";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRouter);
app.use("/todos", todoRouter);
app.use("/teams", teamRouter);

app.listen(PORT, () => {
  console.log(`서버 실행 : ${PORT}`);
});

export default app;
