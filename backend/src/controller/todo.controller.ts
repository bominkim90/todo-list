import { Request, Response } from "express";
import { createTodoService, getTodosService } from "../services/todo.service";
import { StatusCodes } from "http-status-codes";
import { updateTodoContentsService } from "../services/todo.service";
import { toggleTodoDoneService } from "../services/todo.service";
import { deleteTodoService } from "../services/todo.service";

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

export const updateTodoContents = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;
  const todoId = Number(req.params.id);
  const { contents } = req.body;

  if (!contents) {
    res.status(400).json({ message: "내용을 입력하세요." });
    return;
  }

  const updated = await updateTodoContentsService(todoId, userId!, contents);
  res.status(200).json(updated);
};

export const toggleTodoDone = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;
  const todoId = Number(req.params.id);
  const { isDone } = req.body;

  if (typeof isDone !== "boolean") {
    res.status(400).end();
    return;
  }

  const updated = await toggleTodoDoneService(todoId, userId!, isDone);
  res.status(200).json(updated);
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;
  const todoId = Number(req.params.id);

  const deleted = await deleteTodoService(todoId, userId!);

  if (deleted.count === 0) {
    res.status(404).json({ message: "삭제할 Todo를 찾을 수 없습니다." });
    return;
  }

  res.status(200).json({ message: "삭제 완료!" });
};
