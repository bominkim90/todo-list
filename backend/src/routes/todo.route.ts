import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.post("/todos", (req, res) => {
  res.status(StatusCodes.CREATED).json("개인 Todo 등록");
});

router.post("/todos/:teamId", (req, res) => {
  res.status(StatusCodes.CREATED).json("팀 Todo 등록");
});

router.get("/todos", (req, res) => {
  res.status(StatusCodes.OK).json("개인 Todo 조회");
});

router.get("/todos/:teamId", (req, res) => {
  res.status(StatusCodes.OK).json("팀 Todo 조회");
});

router.put("/todos", (req, res) => {
  res.status(StatusCodes.OK).json("Todo 수정");
});

router.delete("/todos", (req, res) => {
  res.status(StatusCodes.OK).json("개인 Todo 삭제");
});

router.delete("/todos/:teamId", (req, res) => {
  res.status(StatusCodes.OK).json("팀 Todo 삭제");
});

export default router;
