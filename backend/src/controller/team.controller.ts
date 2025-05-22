import { createTeamService } from "../services/team.service";
import { Request, Response } from "express";
import { getMyTeamsService } from "../services/team.service";
import { inviteToTeamService } from "../services/team.service";

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
