import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.post("/team", (req, res) => {
  res.status(StatusCodes.CREATED).json("팀 생성");
});

router.put("/team", (req, res) => {
  res.status(StatusCodes.OK).json("팀 초대");
});

router.delete("/team", (req, res) => {
  res.status(StatusCodes.OK).json("팀 삭제");
});

router.delete("/team/:id", (req, res) => {
  res.status(StatusCodes.OK).json("팀원 삭제");
});

router.get("/team", (req, res) => {
  res.status(StatusCodes.OK).json("팀 조회");
});

export default router;
