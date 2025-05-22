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
