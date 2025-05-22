import { prisma } from "../prisma/client";

export const createTodoService = async (userId: string, contents: string) => {
  const todo = await prisma.userTodos.create({
    data: {
      userId,
      contents,
    },
  });
  return todo;
};

export const getTodosService = async (userId: string) => {
  return prisma.userTodos.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const updateTodoContentsService = async (
  todoId: number,
  userId: string,
  contents: string
) => {
  return prisma.userTodos.updateMany({
    where: { id: todoId, userId },
    data: { contents },
  });
};

export const toggleTodoDoneService = async (
  todoId: number,
  userId: string,
  isDone: boolean
) => {
  return prisma.userTodos.updateMany({
    where: { id: todoId, userId },
    data: { isDone },
  });
};

export const deleteTodoService = async (todoId: number, userId: string) => {
  return prisma.userTodos.deleteMany({
    where: {
      id: todoId,
      userId,
    },
  });
};
