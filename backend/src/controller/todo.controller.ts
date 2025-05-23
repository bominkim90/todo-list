import { Request, Response } from "express";
import {
  createTodoService,
  getTodosService,
  updateTodoContentsService,
  toggleTodoDoneService,
  deleteTodoService,
} from "../services/todo.service";
import { StatusCodes } from "http-status-codes";

export const createTodo = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { contents } = req.body;

  if (!contents) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "내용을 입력하세요." });
  }

  const newTodo = await createTodoService(userId!, contents);
  return res.status(StatusCodes.CREATED).json(newTodo);
};

export const getTodos = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const todos = await getTodosService(userId!);
  return res.status(StatusCodes.OK).json(todos);
};

export const updateTodoContents = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const todoId = Number(req.params.id);
  const { contents } = req.body;

  if (!contents) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "내용을 입력하세요." });
  }

  const updated = await updateTodoContentsService(todoId, userId!, contents);
  return res.status(StatusCodes.OK).json(updated);
};

export const toggleTodoDone = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const todoId = Number(req.params.id);

  const updated = await toggleTodoDoneService(todoId, userId!);
  res.status(StatusCodes.OK).json(updated);
  return;
};

export const deleteTodo = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const todoId = Number(req.params.id);

  const deleted = await deleteTodoService(todoId, userId!);

  if (deleted.count === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "삭제할 Todo를 찾을 수 없습니다." });
  }

  return res.status(StatusCodes.OK).json({ message: "삭제 완료!" });
};
