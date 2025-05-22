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
