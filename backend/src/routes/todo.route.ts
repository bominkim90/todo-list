import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

// 개인 todo 등록
router.post("/", (req, res) => {
  res.status(StatusCodes.CREATED).json("개인 Todo 등록");
});

// 개인 todo 조회
router.get("/", (req, res) => {
  res.status(StatusCodes.OK).json("개인 Todo 조회");
});

// 개인 todo 수정
router.put("/:todoId", (req, res) => {
  res.status(StatusCodes.OK).json("개인 Todo 수정");
});

// 개인 todo 삭제
router.delete("/:todoId", (req, res) => {
  res.status(StatusCodes.OK).json("개인 Todo 삭제");
});

export default router;
