import {
  createTeam,
  deleteTeam,
  getMyTeams,
  inviteToTeam,
  removeTeamMember,
} from "../controller/team.controller";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
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
 * /teams/{teamId}:
 *   get:
 *     summary: 팀 상세 조회
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 팀 정보 반환
 */
router.get("/:teamId", (req, res) => {
  res.status(StatusCodes.OK).json("팀 상세 조회");
});

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: 팀 목록 조회
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: 전체 팀 목록 반환
 */
router.get("/", (req, res) => {
  res.status(StatusCodes.OK).json("팀 목록 조회");
});

/**
 * @swagger
 * /teams/{teamId}/todos:
 *   post:
 *     summary: 팀 Todo 등록
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: teamId
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
 *       201:
 *         description: 등록 완료
 */
router.post("/:teamId/todos", (req, res) => {
  res.status(StatusCodes.CREATED).json("팀 Todo 등록");
});

/**
 * @swagger
 * /teams/{teamId}/todos:
 *   get:
 *     summary: 팀 Todo 조회
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 팀 Todo 목록 반환
 */
router.get("/:teamId/todos", (req, res) => {
  res.status(StatusCodes.OK).json("팀 Todo 조회");
});

/**
 * @swagger
 * /teams/{teamId}/todos/{todoId}:
 *   put:
 *     summary: 팀 Todo 수정
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: integer
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
 *         description: 수정 완료
 */
router.put("/:teamId/todos/:todoId", (req, res) => {
  res.status(StatusCodes.OK).json("팀 Todo 수정");
});

/**
 * @swagger
 * /teams/{teamId}/todos/{todoId}:
 *   delete:
 *     summary: 팀 Todo 삭제
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 삭제 완료
 */
router.delete("/:teamId/todos/:todoId", (req, res) => {
  res.status(StatusCodes.OK).json("팀 Todo 삭제");
});

export default router;
