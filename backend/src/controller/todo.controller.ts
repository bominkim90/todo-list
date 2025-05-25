import { Request, Response } from "express";
import {
  createTodoService,
  getTodosService,
  updateTodoContentsService,
  toggleTodoDoneService,
  deleteTodoService,
} from "../services/todo.service";
import { StatusCodes } from "http-status-codes";
import {
  CreateTodoDTO,
  UpdateTodoContentsDTO,
  ToggleTodoStatusDTO,
  DeleteTodoDTO,
} from "../dtos/todo.dto";

export const createTodo = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { contents } = req.body;

  if (!contents) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "내용을 입력하세요." });
  }

  const dto: CreateTodoDTO = { userId: userId!, contents };
  const newTodo = await createTodoService(dto);
  res.status(StatusCodes.CREATED).json(newTodo);
};

export const getTodos = async (req: Request, res: Response) => {
  const userId = req.user?.id!;
  const todos = await getTodosService(userId);
  res.status(StatusCodes.OK).json(todos);
};

export const updateTodoContents = async (req: Request, res: Response) => {
  const userId = req.user?.id!;
  const todoId = Number(req.params.id);
  const { contents } = req.body;

  if (!contents) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "내용을 입력하세요." });
  }

  const dto: UpdateTodoContentsDTO = { todoId, userId, contents };
  const updated = await updateTodoContentsService(dto);
  res.status(StatusCodes.OK).json(updated);
};

export const toggleTodoDone = async (req: Request, res: Response) => {
  const userId = req.user?.id!;
  const todoId = Number(req.params.id);

  const dto: ToggleTodoStatusDTO = { todoId, userId };
  const updated = await toggleTodoDoneService(dto);
  res.status(StatusCodes.OK).json(updated);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const userId = req.user?.id!;
  const todoId = Number(req.params.id);

  const dto: DeleteTodoDTO = { todoId, userId };
  const deleted = await deleteTodoService(dto);

  if (!deleted) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "삭제할 Todo를 찾을 수 없습니다." });
  }

  res.status(StatusCodes.OK).json({ message: "삭제 완료!" });
};
