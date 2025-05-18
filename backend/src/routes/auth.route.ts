import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.post("/signup", (req, res) => {
  res.status(StatusCodes.CREATED).json("회원가입");
});

router.post("/login", (req, res) => {
  res.status(StatusCodes.OK).json("로그인");
});

export default router;
