"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: 개인 Todo API
 */
/**
 * @swagger
 * /todos:
 *   post:
 *     summary: 개인 Todo 등록
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contents:
 *                 type: string
 *     responses:
 *       201:
 *         description: 등록 성공
 */
router.post("/", (req, res) => {
    res.status(http_status_codes_1.StatusCodes.CREATED).json("개인 Todo 등록");
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
    res.status(http_status_codes_1.StatusCodes.OK).json("개인 Todo 조회");
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
    res.status(http_status_codes_1.StatusCodes.OK).json("개인 Todo 수정");
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
    res.status(http_status_codes_1.StatusCodes.OK).json("개인 Todo 삭제");
});
exports.default = router;
