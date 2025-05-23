import axios from '../lib/axios'


// 팀 '리스트' GET
export async function getTeamList() {
  try {
    const res = await axios.get('/teams');
    return res.data;
  }
  catch (err) {
    console.error("팀 리스트 GET 요청 실패 ", err);
    return false;
  }
}

// 팀 '만들기' POST
export async function postCreateTeam(teamNameValue: string) {
  try {
    const res = await axios.post('/teams', {
      name: teamNameValue
    });
    console.log("팀 '만들기' POST res : ", res);
    return (res.status === 201);
  }
  catch (err) {
    console.error("팀 만들기 POST 요청 실패 ", err);
    return false;
  }
}

// 팀 '삭제' DELETE
export async function deleteTeam(currentTeamId:number) {
  try {
    const res = await axios.delete(`/teams/${currentTeamId}`);
    return (res.status === 200);
  }
  catch (err) {
    console.error("팀 삭제 DELETE 요청 실패 ", err);
    return false;
  }
}

/******************************************************/
// 팀원 조회 GET
export async function getCrewList(currentTeamId: any) {
  try {
    const res = await axios.get(`/teams/${currentTeamId}`);
    return res.data;
  }
  catch (err) {
    console.error("팀원 목록 GET 실패 ", err);
    return false;
  }
}

// 팀원 초대 
export async function putCrew(currentTeamId:any ,crewId: any) {
  try {
    const res = await axios.put(`/teams/${currentTeamId}/invite`, {
      userId : crewId
    });
    return (res.status === 200);
  }
  catch (err) {
    console.error("팀원 초대 PUT 실패 ", err);
    return false;
  }
}

// 팀원 추방 DELETE
export async function deleteCrew(currentTeamId: any, userId:any) {
  try {
    const res = await axios.delete(`/teams/${currentTeamId}/members/${userId}`);
    return (res.status === 200);
  }
  catch (err) {
    console.error("팀원 추방 DELETE 실패 ", err);
    return false;
  }
}