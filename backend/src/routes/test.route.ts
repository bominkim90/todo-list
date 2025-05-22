// src/routes/test.route.ts
import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, (req, res) => {
  res.json({
    message: "인증 성공!",
    user: req.user, // JWT에서 추출한 정보가 들어있는지 확인
  });
});

export default router;
