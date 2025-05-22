import { prisma } from "../prisma/client";

export const createTeamService = async (name: string, adminId: string) => {
  const team = await prisma.teams.create({
    data: {
      name,
      adminId,
      members: {
        create: {
          userId: adminId,
        },
      },
    },
    include: {
      members: true,
    },
  });

  return team;
};

export const getMyTeamsService = async (userId: string) => {
  return prisma.teams.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
    include: {
      members: {
        select: {
          userId: true,
        },
      },
    },
  });
};

export const inviteToTeamService = async (
  teamId: number,
  adminId: string,
  userId: string
) => {
  const team = await prisma.teams.findUnique({
    where: { id: teamId },
    include: { members: true },
  });

  if (!team) {
    return { success: false, status: 404, message: "팀이 존재하지 않습니다." };
  }

  if (team.adminId !== adminId) {
    return {
      success: false,
      status: 403,
      message: "관리자만 초대할 수 있습니다.",
    };
  }

  const alreadyMember = team.members.find((m) => m.userId === userId);
  if (alreadyMember) {
    return { success: false, status: 400, message: "이미 초대된 팀원입니다." };
  }

  const user = await prisma.users.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return {
      success: false,
      status: 404,
      message: "사용자가 존재하지 않습니다.",
    };
  }

  const member = await prisma.teamMembers.create({
    data: {
      userId,
      teamId,
    },
  });

  return { success: true, member };
};

export const deleteTeamService = async (teamId: number, adminId: string) => {
  const team = await prisma.teams.findUnique({
    where: { id: teamId },
  });

  if (!team) {
    return { success: false, status: 404, message: "팀이 존재하지 않습니다." };
  }

  if (team.adminId !== adminId) {
    return {
      success: false,
      status: 403,
      message: "관리자만 삭제할 수 있습니다.",
    };
  }

  await prisma.teams.delete({
    where: { id: teamId },
  });

  return { success: true };
};

export const removeTeamMemberService = async (
  teamId: number,
  adminId: string,
  userId: string
) => {
  const team = await prisma.teams.findUnique({
    where: { id: teamId },
  });

  if (!team) {
    return {
      success: false,
      status: 404,
      message: "팀이 존재하지 않습니다.",
    };
  }

  if (team.adminId !== adminId) {
    return {
      success: false,
      status: 403,
      message: "관리자만 강퇴할 수 있습니다.",
    };
  }

  if (adminId === userId) {
    return {
      success: false,
      status: 400,
      message: "관리자는 자신을 강퇴할 수 없습니다.",
    };
  }

  const member = await prisma.teamMembers.findUnique({
    where: {
      userId_teamId: {
        userId,
        teamId,
      },
    },
  });

  if (!member) {
    return {
      success: false,
      status: 404,
      message: "해당 사용자는 팀원이 아닙니다.",
    };
  }

  await prisma.teamMembers.delete({
    where: {
      userId_teamId: {
        userId,
        teamId,
      },
    },
  });

  return { success: true };
};
export const getTeamByIdService = async (teamId: number) => {
  return prisma.teams.findUnique({
    where: { id: teamId },
    include: {
      members: {
        select: { userId: true },
      },
    },
  });
};

export const getTeamTodosService = async (teamId: number, userId: string) => {
  const isMember = await prisma.teamMembers.findUnique({
    where: {
      userId_teamId: { userId, teamId },
    },
  });

  if (!isMember) {
    return {
      success: false,
      status: 403,
      message: "해당 팀에 접근할 수 없습니다.",
    };
  }

  const todos = await prisma.teamTodos.findMany({
    where: { teamId },
    orderBy: { createdAt: "desc" },
  });

  return { success: true, todos };
};

export const createTeamTodoService = async (
  teamId: number,
  userId: string,
  contents: string
) => {
  // 팀 멤버인지 확인
  const isMember = await prisma.teamMembers.findUnique({
    where: {
      userId_teamId: {
        userId,
        teamId,
      },
    },
  });

  if (!isMember) {
    return {
      success: false,
      status: 403,
      message: "팀에 속한 사용자만 할 일을 등록할 수 있습니다.",
    };
  }

  const todo = await prisma.teamTodos.create({
    data: {
      teamId,
      contents,
    },
  });

  return {
    success: true,
    todo,
  };
};

export const updateTeamTodoContentsService = async (
  teamId: number,
  todoId: number,
  userId: string,
  contents: string
) => {
  const isMember = await prisma.teamMembers.findUnique({
    where: { userId_teamId: { userId, teamId } },
  });

  if (!isMember) {
    return {
      success: false,
      status: 403,
      message: "팀에 속한 사용자만 수정할 수 있습니다.",
    };
  }

  await prisma.teamTodos.updateMany({
    where: { id: todoId, teamId },
    data: { contents },
  });

  return { success: true };
};

export const updateTeamTodoStatusService = async (
  teamId: number,
  todoId: number,
  userId: string,
  isDone: boolean
) => {
  const isMember = await prisma.teamMembers.findUnique({
    where: { userId_teamId: { userId, teamId } },
  });

  if (!isMember) {
    return {
      success: false,
      status: 403,
      message: "팀에 속한 사용자만 수정할 수 있습니다.",
    };
  }

  await prisma.teamTodos.updateMany({
    where: { id: todoId, teamId },
    data: { isDone },
  });

  return { success: true };
};

export const deleteTeamTodoService = async (
  teamId: number,
  todoId: number,
  userId: string
) => {
  const isMember = await prisma.teamMembers.findUnique({
    where: { userId_teamId: { userId, teamId } },
  });

  if (!isMember) {
    return {
      success: false,
      status: 403,
      message: "팀에 속한 사용자만 삭제할 수 있습니다.",
    };
  }

  const result = await prisma.teamTodos.deleteMany({
    where: {
      id: todoId,
      teamId,
    },
  });

  if (result.count === 0) {
    return {
      success: false,
      status: 404,
      message: "할 일을 찾을 수 없습니다.",
    };
  }

  return { success: true };
};
