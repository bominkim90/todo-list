import {
  createTeamService,
  updateTeamTodoContentsService,
  updateTeamTodoStatusService,
} from "../services/team.service";
import { Request, Response } from "express";
import { getMyTeamsService } from "../services/team.service";
import { inviteToTeamService } from "../services/team.service";
import { deleteTeamService } from "../services/team.service";
import { getTeamByIdService } from "../services/team.service";
import { getTeamTodosService } from "../services/team.service";
import { createTeamTodoService } from "../services/team.service";
import { deleteTeamTodoService } from "../services/team.service";

export const createTeam = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: "팀 이름을 입력해주세요." });
    return;
  }

  const team = await createTeamService(name, userId!);
  res.status(201).json(team);
};

export const getMyTeams = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;

  const teams = await getMyTeamsService(userId!);
  res.status(200).json(teams);
};

export const inviteToTeam = async (
  req: Request,
  res: Response
): Promise<void> => {
  const adminId = req.user?.id;
  const teamId = Number(req.params.id);
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ message: "초대할 사용자 ID를 입력해주세요." });
    return;
  }

  const result = await inviteToTeamService(teamId, adminId!, userId);

  if (!result.success) {
    res.status(result.status!).json({ message: result.message });
    return;
  }

  res.status(200).json({ message: "초대 성공!", member: result.member });
};

export const deleteTeam = async (
  req: Request,
  res: Response
): Promise<void> => {
  const teamId = Number(req.params.id);
  const adminId = req.user?.id!;

  const result = await deleteTeamService(teamId, adminId);

  if (!result.success) {
    res.status(result.status!).json({ message: result.message });
    return;
  }

  res.status(200).json({ message: "팀 삭제 완료" });
};

import { removeTeamMemberService } from "../services/team.service";

export const removeTeamMember = async (
  req: Request,
  res: Response
): Promise<void> => {
  const teamId = Number(req.params.teamId);
  const userId = req.params.userId;
  const adminId = req.user?.id!;

  const result = await removeTeamMemberService(teamId, adminId, userId);

  if (!result.success) {
    res.status(result.status!).json({ message: result.message });
    return;
  }

  res.status(200).json({ message: "팀원을 강퇴했습니다." });
};

export const getTeamById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const teamId = Number(req.params.id);

  const team = await getTeamByIdService(teamId);

  if (!team) {
    res.status(404).json({ message: "팀이 존재하지 않습니다." });
    return;
  }

  res.status(200).json(team);
};

export const getTeamTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user?.id!;
  const teamId = Number(req.params.teamId);

  const result = await getTeamTodosService(teamId, userId);

  if (!result.success) {
    res.status(result.status!).json({ message: result.message });
    return;
  }

  res.status(200).json(result.todos);
};

export const createTeamTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user?.id!;
  const teamId = Number(req.params.teamId);
  const { contents } = req.body;

  if (!contents) {
    res.status(400).json({ message: "내용을 입력해 주세요." });
    return;
  }

  const result = await createTeamTodoService(teamId, userId, contents);

  if (!result.success) {
    res.status(result.status!).json({ message: result.message });
    return;
  }

  res.status(201).json(result.todo);
};

export const updateTeamTodoContents = async (req: Request, res: Response) => {
  const userId = req.user?.id!;
  const teamId = Number(req.params.teamId);
  const todoId = Number(req.params.todoId);
  const { contents } = req.body;

  if (!contents) {
    res.status(400).json({ message: "내용을 입력해 주세요." });
    return;
  }

  const result = await updateTeamTodoContentsService(
    teamId,
    todoId,
    userId,
    contents
  );

  if (!result.success) {
    res.status(result.status!).json({ message: result.message });
    return;
  }

  res.status(200).json({ message: "내용을 수정했습니다." });
  return;
};

export const updateTeamTodoStatus = async (req: Request, res: Response) => {
  const userId = req.user?.id!;
  const teamId = Number(req.params.teamId);
  const todoId = Number(req.params.todoId);
  const { isDone } = req.body;

  if (typeof isDone !== "boolean") {
    res.status(400).json({ message: "isDone 값이 잘못되었습니다." });
    return;
  }

  const result = await updateTeamTodoStatusService(
    teamId,
    todoId,
    userId,
    isDone
  );

  if (!result.success) {
    res.status(result.status!).json({ message: result.message });
    return;
  }

  res.status(200).json({ message: "상태를 수정했습니다." });
  return;
};

export const deleteTeamTodo = async (req: Request, res: Response) => {
  const userId = req.user?.id!;
  const teamId = Number(req.params.teamId);
  const todoId = Number(req.params.todoId);

  const result = await deleteTeamTodoService(teamId, todoId, userId);

  if (!result.success) {
    res.status(result.status!).json({ message: result.message });
    return;
  }

  res.status(200).json({ message: "할 일을 삭제했습니다." });
  return;
};
