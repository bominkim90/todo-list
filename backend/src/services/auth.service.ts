import { prisma } from "../prisma/client";
import { hashPassword, validatePassword } from "../lib/password";
import { generateToken } from "../lib/jwt";
import { SignupDTO, LoginDTO } from "../dtos/auth.dto";

const findUserById = async (id: string) => {
  return prisma.users.findUnique({ where: { id } });
};

export const signup = async ({ id, password }: SignupDTO) => {
  const existingUser = await findUserById(id);
  if (existingUser) throw new Error("이미 존재하는 ID입니다.");

  const hashedPassword = await hashPassword(password);

  const newUser = await prisma.users.create({
    data: {
      id,
      password: hashedPassword,
    },
  });

  return { id: newUser.id };
};

export const login = async ({ id, password }: LoginDTO) => {
  const user = await findUserById(id);
  if (!user) throw new Error("존재하지 않는 사용자입니다.");

  const isPasswordValid = await validatePassword(password, user.password);
  if (!isPasswordValid) throw new Error("비밀번호가 일치하지 않습니다.");

  return generateToken(user.id);
};
