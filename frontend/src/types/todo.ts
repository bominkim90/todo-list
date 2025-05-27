
export type Todo = {
  id: number;
  contents: string;
  isDone: boolean;
  createdAt: string; // ISO 형식 문자열로 오므로 string
  updatedAt: string;
  userId: string;
};