import { createTeamService } from "../services/team.service";
import { Request, Response } from "express";

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
