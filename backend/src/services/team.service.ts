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
