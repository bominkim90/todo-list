"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: 팀 및 팀 Todo API
 */
/**
 * @swagger
 * /teams:
 *   post:
 *     summary: 팀 생성
 *     tags: [Teams]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teamName:
 *                 type: string
 *     responses:
 *       201:
 *         description: 팀 생성됨
 */
router.post("/", (req, res) => {
    res.status(http_status_codes_1.StatusCodes.CREATED).json("팀 생성");
});
/**
 * @swagger
 * /teams/{teamId}/invite:
 *   post:
 *     summary: 팀 초대
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
 *               inviteId:
 *                 type: string
 *     responses:
 *       200:
 *         description: 초대 성공
 */
router.post("/:teamId/invite", (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).json("팀 초대");
});
/**
 * @swagger
 * /teams/{teamId}:
 *   delete:
 *     summary: 팀 삭제
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 삭제 완료
 */
router.delete("/:teamId", (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).json("팀 삭제");
});
/**
 * @swagger
 * /teams/{teamId}/members/{memberId}:
 *   delete:
 *     summary: 팀원 삭제
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 삭제 완료
 */
router.delete("/:teamId/members/:memberId", (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).json("팀원 삭제");
});
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
    res.status(http_status_codes_1.StatusCodes.OK).json("팀 상세 조회");
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
    res.status(http_status_codes_1.StatusCodes.OK).json("팀 목록 조회");
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
    res.status(http_status_codes_1.StatusCodes.CREATED).json("팀 Todo 등록");
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
    res.status(http_status_codes_1.StatusCodes.OK).json("팀 Todo 조회");
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
    res.status(http_status_codes_1.StatusCodes.OK).json("팀 Todo 수정");
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
    res.status(http_status_codes_1.StatusCodes.OK).json("팀 Todo 삭제");
});
exports.default = router;
