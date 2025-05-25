export interface CreateTodoDTO {
  userId: string;
  contents: string;
}

export interface UpdateTodoContentsDTO {
  todoId: number;
  userId: string;
  contents: string;
}

export interface ToggleTodoStatusDTO {
  todoId: number;
  userId: string;
}

export interface DeleteTodoDTO {
  todoId: number;
  userId: string;
}
