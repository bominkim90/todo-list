// src/dtos/team.dto.ts

export interface CreateTeamDTO {
  name: string;
  adminId: string;
}

export interface InviteToTeamDTO {
  teamId: number;
  adminId: string;
  userId: string;
}

export interface DeleteTeamDTO {
  teamId: number;
  adminId: string;
}

export interface RemoveTeamMemberDTO {
  teamId: number;
  adminId: string;
  userId: string;
}

export interface GetTeamTodosDTO {
  teamId: number;
  userId: string;
}

export interface CreateTeamTodoDTO {
  teamId: number;
  userId: string;
  contents: string;
}

export interface UpdateTeamTodoContentsDTO {
  teamId: number;
  todoId: number;
  userId: string;
  contents: string;
}

export interface UpdateTeamTodoStatusDTO {
  teamId: number;
  todoId: number;
  userId: string;
}

export interface DeleteTeamTodoDTO {
  teamId: number;
  todoId: number;
  userId: string;
}
