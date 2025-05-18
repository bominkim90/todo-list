import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

// 팀 생성
router.post("/", (req, res) => {
  res.status(StatusCodes.CREATED).json("팀 생성");
});

// 팀 초대
router.post("/:teamId/invite", (req, res) => {
  res.status(StatusCodes.OK).json("팀 초대");
});

// 팀 삭제
router.delete("/:teamId", (req, res) => {
  res.status(StatusCodes.OK).json("팀 삭제");
});

// 팀원 삭제
router.delete("/:teamId/members/:memberId", (req, res) => {
  res.status(StatusCodes.OK).json("팀원 삭제");
});

// 팀 단건 조회
router.get("/:teamId", (req, res) => {
  res.status(StatusCodes.OK).json("팀 상세 조회");
});

// 팀 목록 조회
router.get("/", (req, res) => {
  res.status(StatusCodes.OK).json("팀 목록 조회");
});

// 팀 todo 등록
router.post("/:teamId/todos", (req, res) => {
  res.status(StatusCodes.CREATED).json("팀 Todo 등록");
});

// 팀 todo 조회
router.get("/:teamId/todos", (req, res) => {
  res.status(StatusCodes.OK).json("팀 Todo 조회");
});

// 팀 todo 수정
router.put("/:teamId/todos/:todoId", (req, res) => {
  res.status(StatusCodes.OK).json("팀 Todo 수정");
});

// 팀 todo 삭제
router.delete("/:teamId/todos/:todoId", (req, res) => {
  res.status(StatusCodes.OK).json("팀 Todo 삭제");
});

export default router;
