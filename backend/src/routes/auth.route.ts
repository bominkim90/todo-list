import { Router } from "express";
import { signup, login } from "../controller/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 사용자 인증 API (ID 기반)
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: 회원가입
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "test"
 *               password:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *       400:
 *         description: 요청 오류
 */
router.post("/signup", signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 로그인
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "test"
 *               password:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: 로그인 성공, JWT 토큰 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: 인증 실패
 */
router.post("/login", login);

export default router;
