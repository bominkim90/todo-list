import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { StatusCodes } from "http-status-codes";

export const signup = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;
    const result = await authService.signup(Number(id), password);
    res.status(StatusCodes.CREATED).json(result);
  } catch (err: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;
    const token = await authService.login(Number(id), password);
    res.status(StatusCodes.OK).json({ token });
  } catch (err: any) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message });
  }
};
