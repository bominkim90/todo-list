import { Request, Response } from "express";
import { createTodoService, getTodosService } from "../services/todo.service";
import { StatusCodes } from "http-status-codes";

export const createTodo = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { contents } = req.body;

  if (!contents) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "내용을 입력하세요." });
    return;
  }

  const newTodo = await createTodoService(userId!, contents);
  res.status(StatusCodes.CREATED).json(newTodo);
  return;
};

export const getTodos = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const todos = await getTodosService(userId!);
  res.status(StatusCodes.OK).json(todos);
};
