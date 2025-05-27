
export type Team = {
  adminId: string;
  id: number;
  members: Member[];
  name: string;
};

type Member = {
  userId: string;
}