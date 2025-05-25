import axios from '../lib/axios'


// 개인 todo 리스트 GET
export async function getMyTodo() {
  try {
    const res = await axios.get(`/todos`);
    return res.data;
  }
  catch (err) {
    console.error("개인 todo GET 요청 실패 ", err);
    return false;
  }
}
// 팀 todo 리스트 GET
export async function getTeamTodo(currentTeamId:any) {
  try {
    const res = await axios.get(`/teams/${currentTeamId}/todos`);
    return res.data;
  }
  catch (err) {
    console.error("팀 todo GET 요청 실패 ", err);
    return false;
  }
}


/*****************************************************/
// 개인 todo 등록 POST
export async function postMyTodo(todoContents:any) {
  try {
    const res = await axios.post(`/todos`, {
      contents: todoContents
    });
    return (res.status === 201);
  }
  catch (err) {
    console.error("개인 todo 등록 POST 실패 ", err);
    return false;
  }
}

// 팀 todo 등록 POST
export async function postTeamTodo(todoContents:any, currentTeamId:any) {
  try {
    const res = await axios.post(`/teams/${currentTeamId}/todos`, {
      contents: todoContents
    });
    return (res.status === 201);
  }
  catch (err) {
    console.error("팀 todo 등록 POST 실패 ", err);
    return false;
  }
}


/*****************************************************/
// 개인 todo 수정 PUT
export async function putMyTodo(todoId:any, todoContents:any) {
  try {
    const res = await axios.put(`/todos/${todoId}/contents`, {
      contents: todoContents
    });
    return (res.status === 200);
  }
  catch (err) {
    console.error("팀 todo 등록 POST 실패 ", err);
    return false;
  }
}

// 팀 todo 수정 PUT
export async function putTeamTodo(currentTeamId:any ,id:any, todoContents:any) {
  try { // teams/:teamId/todos/:id/contents
    const res = await axios.put(`/teams/${currentTeamId}/todos/${id}/contents`, {
      todoId: id,
      contents: todoContents
    });
    return (res.status === 200);
  }
  catch (err) {
    console.error("팀 todo 등록 POST 실패 ", err);
    return false;
  }
}

/*****************************************************/
// 개인 todo 삭제 DELETE
export async function deleteMyTodo(id:any) {
  try {
    const res = await axios.delete(`/todos/${id}`, {
      data: {
        id: id
      }
    });
    return (res.status === 200);
  }
  catch (err) {
    console.error("팀 todo 등록 POST 실패 ", err);
    return false;
  }
}

// 팀 todo 삭제 DELETE
export async function deleteTeamTodo(currentTeamId:any ,id:any) {
  try {
    const res = await axios.delete(`/teams/${currentTeamId}/todos/${id}`, {
      data: {
        id: id
      }
    });
    return (res.status === 200);
  }
  catch (err) {
    console.error("팀 todo 등록 POST 실패 ", err);
    return false;
  }
}

/*****************************************************/
// 개인 todo 상태변경 PUT
export async function putChangeMyTodoDone(todoId:any) {
  try {
    const res = await axios.put(`/todos/${todoId}/done`);
    console.log("개인 todo 상태변경 res : ", res);
    return (res.status === 200);
  }
  catch (err) {
    console.error("개인 todo 상태변경 PUT 실패 ", err);
    return false;
  }
}

// 팀 todo 상태변경 PUT
export async function putChangeTeamTodoDone(currentTeamId:any, id:any) {
  try {
    const res = await axios.put(`/teams/${currentTeamId}/todos/${id}/done`);
    return (res.status === 200);
  }
  catch (err) {
    console.error("팀 todo 상태변경 PUT 실패 ", err);
    return false;
  }
}