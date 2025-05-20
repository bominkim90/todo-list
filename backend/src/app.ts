import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route";
import todoRouter from "./routes/todo.route";
import teamRouter from "./routes/team.route";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRouter);
app.use("/todos", todoRouter);
app.use("/teams", teamRouter);

app.listen(PORT, () => {
  console.log(`서버 실행 : ${PORT}`);
});
