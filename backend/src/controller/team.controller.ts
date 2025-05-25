import { Request, Response } from "express";
import {
  createTeamService,
  getMyTeamsService,
  inviteToTeamService,
  deleteTeamService,
  removeTeamMemberService,
  getTeamByIdService,
  getTeamTodosService,
  createTeamTodoService,
  updateTeamTodoContentsService,
  updateTeamTodoStatusService,
  deleteTeamTodoService,
} from "../services/team.service";
import { StatusCodes } from "http-status-codes";

export const createTeam = async (req: Request, res: Response) => {
  const adminId = req.user?.id!;
  const { name } = req.body;

  if (!name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "팀 이름을 입력해주세요." });
  }

  const team = await createTeamService({ name, adminId });
  res.status(StatusCodes.CREATED).json(team);
};

export const getMyTeams = async (req: Request, res: Response) => {
  const userId = req.user?.id!;
  const teams = await getMyTeamsService(userId);
  res.status(StatusCodes.OK).json(teams);
};

export const inviteToTeam = async (req: Request, res: Response) => {
  const adminId = req.user?.id!;
  const teamId = Number(req.params.id);
  const { userId } = req.body;

  if (!userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "초대할 사용자 ID를 입력해주세요." });
  }

  const result = await inviteToTeamService({ teamId, adminId, userId });

  if (!result.success) {
    return res.status(result.status!).json({ message: result.message });
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "초대 성공!", member: result.member });
};

export const deleteTeam = async (req: Request, res: Response) => {
  const teamId = Number(req.params.id);
  const adminId = req.user?.id!;

  const result = await deleteTeamService({ teamId, adminId });

  if (!result.success) {
    return res.status(result.status!).json({ message: result.message });
  }

  res.status(StatusCodes.OK).json({ message: "팀 삭제 완료" });
};

export const removeTeamMember = async (req: Request, res: Response) => {
  const adminId = req.user?.id!;
  const teamId = Number(req.params.teamId);
  const userId = req.params.userId;

  const result = await removeTeamMemberService({ teamId, adminId, userId });

  if (!result.success) {
    return res.status(result.status!).json({ message: result.message });
  }

  res.status(StatusCodes.OK).json({ message: "팀원을 강퇴했습니다." });
};

export const getTeamById = async (req: Request, res: Response) => {
  const teamId = Number(req.params.id);
  const team = await getTeamByIdService(teamId);

  if (!team) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "팀이 존재하지 않습니다." });
  }

  res.status(StatusCodes.OK).json(team);
};

export const getTeamTodos = async (req: Request, res: Response) => {
  const userId = req.user?.id!;
  const teamId = Number(req.params.teamId);

  const result = await getTeamTodosService({ teamId, userId });

  if (!result.success) {
    return res.status(result.status!).json({ message: result.message });
  }

  res.status(StatusCodes.OK).json(result.todos);
};

export const createTeamTodo = async (req: Request, res: Response) => {
  const userId = req.user?.id!;
  const teamId = Number(req.params.teamId);
  const { contents } = req.body;

  if (!contents) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "내용을 입력해 주세요." });
  }

  const result = await createTeamTodoService({ teamId, userId, contents });

  if (!result.success) {
    return res.status(result.status!).json({ message: result.message });
  }

  res.status(StatusCodes.CREATED).json(result.todo);
};

export const updateTeamTodoContents = async (req: Request, res: Response) => {
  const userId = req.user?.id!;
  const teamId = Number(req.params.teamId);
  const todoId = Number(req.params.todoId);
  const { contents } = req.body;

  if (!contents) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "내용을 입력해 주세요." });
  }

  const result = await updateTeamTodoContentsService({
    teamId,
    todoId,
    userId,
    contents,
  });

  if (!result.success) {
    return res.status(result.status!).json({ message: result.message });
  }

  res.status(StatusCodes.OK).json({ message: "내용을 수정했습니다." });
};

export const updateTeamTodoStatus = async (req: Request, res: Response) => {
  const userId = req.user?.id!;
  const teamId = Number(req.params.teamId);
  const todoId = Number(req.params.todoId);

  const result = await updateTeamTodoStatusService({
    teamId,
    todoId,
    userId,
  });

  if (!result.success) {
    return res.status(result.status!).json({ message: result.message });
  }

  res.status(StatusCodes.OK).json({ message: "상태를 수정했습니다." });
};

export const deleteTeamTodo = async (req: Request, res: Response) => {
  const userId = req.user?.id!;
  const teamId = Number(req.params.teamId);
  const todoId = Number(req.params.todoId);

  const result = await deleteTeamTodoService({ teamId, todoId, userId });

  if (!result.success) {
    return res.status(result.status!).json({ message: result.message });
  }

  res.status(StatusCodes.OK).json({ message: "할 일을 삭제했습니다." });
};
