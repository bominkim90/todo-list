import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodoDone,
  updateTodoContents,
} from "../controller/todo.controller";
import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";

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

router.post("/", authenticate, createTodo);

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: 개인 Todo 조회
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 유저의 todo 리스트 반환
 *       401:
 *         description: 인증 실패
 */

router.get("/", authenticate, getTodos);

/**
 * @swagger
 * /todos/{id}/contents:
 *   put:
 *     summary: 개인 Todo 내용 수정
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 수정할 Todo의 ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contents:
 *                 type: string
 *                 example: "수정된 내용입니다"
 *     responses:
 *       200:
 *         description: 수정 성공
 *       400:
 *         description: 유효하지 않은 요청
 *       401:
 *         description: 인증 실패
 */
router.put("/:id/contents", authenticate, updateTodoContents);

/**
 * @swagger
 * /todos/{id}/done:
 *   put:
 *     summary: 개인 Todo 완료 상태 수정
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 상태를 변경할 Todo의 ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isDone:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: 상태 수정 성공
 *       400:
 *         description: 유효하지 않은 요청
 *       401:
 *         description: 인증 실패
 */
router.put("/:id/done", authenticate, toggleTodoDone);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: 개인 Todo 삭제
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 삭제할 Todo의 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 삭제 성공
 *       404:
 *         description: 삭제할 Todo 없음
 *       401:
 *         description: 인증 실패
 */

router.delete("/:id", authenticate, deleteTodo);

export default router;
