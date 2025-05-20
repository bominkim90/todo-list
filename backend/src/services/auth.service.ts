import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const signup = async (id: number, password: string) => {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (existing) throw new Error("이미 존재하는 ID입니다.");

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      id,
      password: hashed,
    },
  });

  return { id: user.id };
};

export const login = async (id: number, password: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("존재하지 않는 사용자입니다.");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("비밀번호가 일치하지 않습니다.");

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return token;
};
