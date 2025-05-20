import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, (req, res) => {
  res.json({
    message: "인증 성공!",
    user: req.user,
  });
});

export default router;
