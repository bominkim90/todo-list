import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route";
import todoRouter from "./routes/todo.route";
import teamRouter from "./routes/team.route";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/auth", authRouter);
app.use("/", todoRouter);
app.use("/", teamRouter);

app.listen(PORT, () => {
  console.log(`서버 실행 : ${PORT}`);
});
