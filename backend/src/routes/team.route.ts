import {
  createTeam,
  createTeamTodo,
  deleteTeam,
  deleteTeamTodo,
  getMyTeams,
  getTeamById,
  getTeamTodos,
  inviteToTeam,
  removeTeamMember,
  updateTeamTodoContents,
  updateTeamTodoStatus,
} from "../controller/team.controller";
import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: 팀 생성
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "개발자 스터디"
 *     responses:
 *       201:
 *         description: 팀 생성 완료
 *       400:
 *         description: 잘못된 요청
 *       401:
 *         description: 인증 실패
 */

router.post("/", authenticate, createTeam);

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: 내가 속한 팀 목록 조회
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 팀 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   adminId:
 *                     type: string
 *                   members:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         userId:
 *                           type: string
 *       401:
 *         description: 인증 실패
 */

router.get("/", authenticate, getMyTeams);

/**
 * @swagger
 * /teams/{id}/invite:
 *   put:
 *     summary: 팀에 사용자 초대
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 초대할 팀의 ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 example: banana456
 *     responses:
 *       200:
 *         description: 초대 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 초대 성공!
 *                 member:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     userId:
 *                       type: string
 *                     teamId:
 *                       type: integer
 *       400:
 *         description: 잘못된 요청 (이미 팀원이거나 userId 미입력)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 이미 초대된 팀원입니다.!
 *       403:
 *         description: 권한 없음 (관리자만 초대 가능)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 관리자만 초대할 수 있습니다다.
 *       404:
 *         description: 팀 또는 사용자 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 초대하려는 사용자가 존재하지 않습니다다.
 */

router.put("/:id/invite", authenticate, inviteToTeam);

/**
 * @swagger
 * /teams/{id}:
 *   delete:
 *     summary: 팀 삭제
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 삭제할 팀 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 팀 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 팀 삭제 완료
 *       403:
 *         description: 관리자만 삭제 가능
 *       404:
 *         description: 팀이 존재하지 않음
 */

router.delete("/:id", authenticate, deleteTeam);

/**
 * @swagger
 * /teams/{teamId}/members/{userId}:
 *   delete:
 *     summary: 팀원 강퇴
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: 팀 ID
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: 강퇴할 사용자 ID
 *     responses:
 *       200:
 *         description: 강퇴 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 팀원을 강퇴했습니다.
 *       400:
 *         description: 관리자 본인은 강퇴 불가
 *       403:
 *         description: 관리자만 강퇴 가능
 *       404:
 *         description: 팀 또는 팀원 없음
 */

router.delete("/:teamId/members/:userId", authenticate, removeTeamMember);

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: 팀 단일 조회
 *     tags: [Team]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 팀 ID
 *     responses:
 *       200:
 *         description: 팀 정보 반환
 *       404:
 *         description: 팀이 존재하지 않음
 */
router.get("/:id", authenticate, getTeamById);

/**
 * @swagger
 * /teams/{teamId}/todos:
 *   get:
 *     summary: 팀 Todo 목록 조회
 *     tags: [TeamTodo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         description: 조회할 팀 ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 팀 Todo 리스트 반환
 *       403:
 *         description: 팀원이 아닌 경우
 *       404:
 *         description: 팀이 존재하지 않음
 */

router.get("/:teamId/todos", authenticate, getTeamTodos);

/**
 * @swagger
 * /teams/{teamId}/todos:
 *   post:
 *     summary: 팀 할 일 등록
 *     tags: [TeamTodo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         description: 할 일을 등록할 팀 ID
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
 *                 example: 팀 스프린트 준비
 *     responses:
 *       201:
 *         description: 등록 성공
 *       400:
 *         description: 유효하지 않은 요청
 *       403:
 *         description: 팀원이 아닌 경우
 */

router.post("/:teamId/todos", authenticate, createTeamTodo);

/**
 * @swagger
 * /teams/{teamId}/todos/{todoId}/contents:
 *   put:
 *     summary: 팀 Todo 내용 수정
 *     tags: [TeamTodo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         description: 팀 ID
 *         schema:
 *           type: integer
 *       - name: todoId
 *         in: path
 *         required: true
 *         description: 수정할 Todo ID
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
 *                 example: 회의 안건 정리
 *     responses:
 *       200:
 *         description: 내용 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 내용을 수정했습니다.
 *       400:
 *         description: 요청값 오류
 *       403:
 *         description: 권한 없음
 */
router.put(
  "/:teamId/todos/:todoId/contents",
  authenticate,
  updateTeamTodoContents
);

/**
 * @swagger
 * /teams/{teamId}/todos/{todoId}/done:
 *   put:
 *     summary: 팀 Todo 완료 상태 수정
 *     tags: [TeamTodo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         description: 팀 ID
 *         schema:
 *           type: integer
 *       - name: todoId
 *         in: path
 *         required: true
 *         description: 완료 여부를 수정할 Todo ID
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 상태를 수정했습니다.
 *       400:
 *         description: 요청값 오류
 *       403:
 *         description: 권한 없음
 */
router.put("/:teamId/todos/:todoId/done", authenticate, updateTeamTodoStatus);

/**
 * @swagger
 * /teams/{teamId}/todos/{todoId}:
 *   delete:
 *     summary: 팀 할 일 삭제
 *     tags: [TeamTodo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: 팀 ID
 *       - name: todoId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: 삭제할 할 일 ID
 *     responses:
 *       200:
 *         description: 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 할 일을 삭제했습니다.
 *       403:
 *         description: 팀원이 아닌 경우
 *       404:
 *         description: 할 일이 없거나 삭제 실패
 */
router.delete("/:teamId/todos/:todoId", authenticate, deleteTeamTodo);

export default router;
