import axios from '../lib/axios'


// todo 리스트 GET
export async function getTodo(currentTeamId:any) {
  try {
    const res = await axios.get(`/todos/${currentTeamId || ""}`);
    return res.data;
  }
  catch (err) {
    console.error("투두리스트 GET 요청 실패 ", err);
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
    const res = await axios.post(`/team/todos/${currentTeamId}`, {
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
export async function putTeamTodo(currentTeamId:any ,todoId:any, todoContents:any) {
  try {
    const res = await axios.put(`/team/${currentTeamId}/todos/${todoId}/contents`, {
      todoId: todoId,
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
export async function deleteMyTodo(todoId:any) {
  try {
    const res = await axios.delete(`/todos/${todoId}`, {
      data: {
        todoId: todoId
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
export async function deleteTeamTodo(currentTeamId:any ,todoId:any) {
  try {
    const res = await axios.delete(`/team/${currentTeamId}/todos/${todoId}`, {
      data: {
        todoId: todoId
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
    return (res.status === 200);
  }
  catch (err) {
    console.error("개인 todo 상태변경 PUT 실패 ", err);
    return false;
  }
}

// 팀 todo 상태변경 PUT
export async function putChangeTeamTodoDone(currentTeamId:any, todoId:any) {
  try {
    const res = await axios.put(`/team/${currentTeamId}/todos/${todoId}/done`);
    return (res.status === 200);
  }
  catch (err) {
    console.error("팀팀 todo 상태변경 PUT 실패 ", err);
    return false;
  }
}