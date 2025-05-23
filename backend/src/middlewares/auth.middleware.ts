import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
}

export const authenticate: RequestHandler = (req, res, next) => {
  const token = req.cookies?.token; // 쿠키에서 토큰 추출

  if (!token) {
    res.status(401).json({ message: "토큰이 없습니다." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = { id: decoded.id }; // 명시적으로 객체 할당
    next();
  } catch {
    res.status(401).json({ message: "유효하지 않은 토큰입니다." });
    return;
  }
};
