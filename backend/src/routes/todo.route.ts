import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: 개인 Todo 등록
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contents:
 *                 type: string
 *                 example: "운동하기"
 *     responses:
 *       201:
 *         description: 생성된 Todo 반환
 *       400:
 *         description: 내용 없음
 */

router.post("/", (req, res) => {
  res.status(StatusCodes.CREATED).json("개인 Todo 등록");
});

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: 개인 Todo 조회
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: 조회 성공
 */
router.get("/", (req, res) => {
  res.status(StatusCodes.OK).json("개인 Todo 조회");
});

/**
 * @swagger
 * /todos/{todoId}:
 *   put:
 *     summary: 개인 Todo 수정
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contents:
 *                 type: string
 *     responses:
 *       200:
 *         description: 수정 성공
 */
router.put("/:todoId", (req, res) => {
  res.status(StatusCodes.OK).json("개인 Todo 수정");
});

/**
 * @swagger
 * /todos/{todoId}:
 *   delete:
 *     summary: 개인 Todo 삭제
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 삭제 성공
 */
router.delete("/:todoId", (req, res) => {
  res.status(StatusCodes.OK).json("개인 Todo 삭제");
});

export default router;
