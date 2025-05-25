import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const validatePassword = (
  rawPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compare(rawPassword, hashedPassword);
};
