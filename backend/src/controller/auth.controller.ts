import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { StatusCodes } from "http-status-codes";

export const signup = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;
    const result = await authService.signup(id, password);
    res.status(StatusCodes.CREATED).json(result);
  } catch (err: any) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: err.message || "회원가입 실패" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;
    const token = await authService.login(id, password);

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 1000, // 1시간
      })
      .status(StatusCodes.OK)
      .json({ message: "로그인 성공" });
  } catch (err: any) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: err.message || "로그인 실패" });
  }
};
