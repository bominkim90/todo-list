import { prisma } from "../prisma/client";

export const createTodoService = async (userId: string, contents: string) => {
  return prisma.userTodos.create({
    data: {
      userId,
      contents,
    },
  });
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
  return prisma.userTodos.update({
    where: { id: todoId },
    data: { contents },
  });
};

export const toggleTodoDoneService = async (todoId: number, userId: string) => {
  const todo = await prisma.userTodos.findFirst({
    where: { id: todoId, userId },
  });

  if (!todo) {
    throw new Error("해당 Todo를 찾을 수 없습니다.");
  }

  return prisma.userTodos.update({
    where: { id: todoId },
    data: { isDone: !todo.isDone },
  });
};

export const deleteTodoService = async (todoId: number, userId: string) => {
  return prisma.userTodos.delete({
    where: { id: todoId },
  });
};
