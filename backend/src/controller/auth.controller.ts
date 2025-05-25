import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { StatusCodes } from "http-status-codes";
import { SignupDTO, LoginDTO } from "../dtos/auth.dto";

const MAX_AGE = 60 * 60 * 1000; // 1시간간

export const signup = async (req: Request, res: Response) => {
  try {
    const signupData: SignupDTO = req.body;
    const result = await authService.signup(signupData);

    res.status(StatusCodes.CREATED).json(result);
  } catch (err: any) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: err.message || "회원가입 실패" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const loginData: LoginDTO = req.body;
    const token = await authService.login(loginData);

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: MAX_AGE,
      })
      .status(StatusCodes.OK)
      .json({ message: "로그인 성공" });
  } catch (err: any) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: err.message || "로그인 실패" });
  }
};
