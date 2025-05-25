import { prisma } from "../prisma/client";
import {
  CreateTodoDTO,
  UpdateTodoContentsDTO,
  ToggleTodoStatusDTO,
  DeleteTodoDTO,
} from "../dtos/todo.dto";

export const createTodoService = async ({
  userId,
  contents,
}: CreateTodoDTO) => {
  return prisma.userTodos.create({
    data: { userId, contents },
  });
};

export const getTodosService = async (userId: string) => {
  return prisma.userTodos.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const updateTodoContentsService = async ({
  todoId,
  userId,
  contents,
}: UpdateTodoContentsDTO) => {
  return prisma.userTodos.update({
    where: { id: todoId },
    data: { contents },
  });
};

export const toggleTodoDoneService = async ({
  todoId,
  userId,
}: ToggleTodoStatusDTO) => {
  const todo = await prisma.userTodos.findFirst({
    where: { id: todoId, userId },
  });

  if (!todo) throw new Error("해당 Todo를 찾을 수 없습니다.");

  return prisma.userTodos.update({
    where: { id: todoId },
    data: { isDone: !todo.isDone },
  });
};

export const deleteTodoService = async ({ todoId, userId }: DeleteTodoDTO) => {
  return prisma.userTodos.delete({
    where: { id: todoId },
  });
};
