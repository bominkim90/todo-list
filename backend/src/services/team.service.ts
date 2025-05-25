import { prisma } from "../prisma/client";
import {
  CreateTeamDTO,
  InviteToTeamDTO,
  DeleteTeamDTO,
  RemoveTeamMemberDTO,
  GetTeamTodosDTO,
  CreateTeamTodoDTO,
  UpdateTeamTodoContentsDTO,
  UpdateTeamTodoStatusDTO,
  DeleteTeamTodoDTO,
} from "../dtos/team.dto";

const getTeamAndVerifyAdmin = async (teamId: number, adminId: string) => {
  const team = await prisma.teams.findUnique({
    where: { id: teamId },
    include: { members: true },
  });

  if (!team)
    return { valid: false, status: 404, message: "팀이 존재하지 않습니다." };
  if (team.adminId !== adminId) {
    return {
      valid: false,
      status: 403,
      message: "관리자만 수행할 수 있습니다.",
    };
  }

  return { valid: true, team };
};

const isTeamMember = async (userId: string, teamId: number) => {
  return prisma.teamMembers.findUnique({
    where: { userId_teamId: { userId, teamId } },
  });
};

export const createTeamService = async ({ name, adminId }: CreateTeamDTO) => {
  return prisma.teams.create({
    data: {
      name,
      adminId,
      members: { create: { userId: adminId } },
    },
    include: { members: true },
  });
};

export const getMyTeamsService = async (userId: string) => {
  return prisma.teams.findMany({
    where: { members: { some: { userId } } },
    include: { members: { select: { userId: true } } },
  });
};

export const inviteToTeamService = async ({
  teamId,
  adminId,
  userId,
}: InviteToTeamDTO) => {
  const { valid, team, status, message } = await getTeamAndVerifyAdmin(
    teamId,
    adminId
  );
  if (!valid) return { success: false, status, message };

  if (team!.members.find((m) => m.userId === userId)) {
    return { success: false, status: 400, message: "이미 초대된 팀원입니다." };
  }

  const user = await prisma.users.findUnique({ where: { id: userId } });
  if (!user) {
    return {
      success: false,
      status: 404,
      message: "사용자가 존재하지 않습니다.",
    };
  }

  const member = await prisma.teamMembers.create({ data: { userId, teamId } });
  return { success: true, member };
};

export const deleteTeamService = async ({ teamId, adminId }: DeleteTeamDTO) => {
  const { valid, status, message } = await getTeamAndVerifyAdmin(
    teamId,
    adminId
  );
  if (!valid) return { success: false, status, message };

  await prisma.teams.delete({ where: { id: teamId } });
  return { success: true };
};

export const removeTeamMemberService = async ({
  teamId,
  adminId,
  userId,
}: RemoveTeamMemberDTO) => {
  const { valid, status, message } = await getTeamAndVerifyAdmin(
    teamId,
    adminId
  );
  if (!valid) return { success: false, status, message };
  if (adminId === userId) {
    return {
      success: false,
      status: 400,
      message: "관리자는 자신을 강퇴할 수 없습니다.",
    };
  }

  const member = await prisma.teamMembers.findUnique({
    where: { userId_teamId: { userId, teamId } },
  });

  if (!member) {
    return {
      success: false,
      status: 404,
      message: "해당 사용자는 팀원이 아닙니다.",
    };
  }

  await prisma.teamMembers.delete({
    where: { userId_teamId: { userId, teamId } },
  });
  return { success: true };
};

export const getTeamByIdService = async (teamId: number) => {
  return prisma.teams.findUnique({
    where: { id: teamId },
    include: { members: { select: { userId: true } } },
  });
};

export const getTeamTodosService = async ({
  teamId,
  userId,
}: GetTeamTodosDTO) => {
  const member = await isTeamMember(userId, teamId);
  if (!member)
    return { success: false, status: 403, message: "접근 권한 없음" };

  const todos = await prisma.teamTodos.findMany({
    where: { teamId },
    orderBy: { createdAt: "desc" },
  });

  return { success: true, todos };
};

export const createTeamTodoService = async ({
  teamId,
  userId,
  contents,
}: CreateTeamTodoDTO) => {
  const member = await isTeamMember(userId, teamId);
  if (!member)
    return { success: false, status: 403, message: "등록 권한 없음" };

  const todo = await prisma.teamTodos.create({ data: { teamId, contents } });
  return { success: true, todo };
};

export const updateTeamTodoContentsService = async ({
  teamId,
  todoId,
  userId,
  contents,
}: UpdateTeamTodoContentsDTO) => {
  const member = await isTeamMember(userId, teamId);
  if (!member)
    return { success: false, status: 403, message: "수정 권한 없음" };

  await prisma.teamTodos.update({ where: { id: todoId }, data: { contents } });
  return { success: true };
};

export const updateTeamTodoStatusService = async ({
  teamId,
  todoId,
  userId,
}: UpdateTeamTodoStatusDTO) => {
  const member = await isTeamMember(userId, teamId);
  if (!member)
    return { success: false, status: 403, message: "수정 권한 없음" };

  const todo = await prisma.teamTodos.findUnique({ where: { id: todoId } });
  if (!todo) return { success: false, status: 404, message: "할 일 없음" };

  await prisma.teamTodos.update({
    where: { id: todoId },
    data: { isDone: !todo.isDone },
  });

  return { success: true };
};

export const deleteTeamTodoService = async ({
  teamId,
  todoId,
  userId,
}: DeleteTeamTodoDTO) => {
  const member = await isTeamMember(userId, teamId);
  if (!member)
    return { success: false, status: 403, message: "삭제 권한 없음" };

  try {
    await prisma.teamTodos.delete({ where: { id: todoId } });
    return { success: true };
  } catch {
    return { success: false, status: 404, message: "할 일 없음" };
  }
};
