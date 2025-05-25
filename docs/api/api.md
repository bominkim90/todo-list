# Todo API 명세서

## 전체 API 구조

| 영역      | 경로 prefix        | 관련 리소스             |
| --------- | ------------------ | ----------------------- |
| 인증      | `/auth`            | 회원가입, 로그인        |
| 개인 Todo | `/todos`           | 본인의 할 일 관리       |
| 팀        | `/teams`           | 팀 관리, 멤버 초대/강퇴 |
| 팀 Todo   | `/teams/:id/todos` | 팀 할 일 등록/수정/삭제 |

**인증 방식**: JWT 토큰 (`Authorization: Bearer <token>`)

---

## 인증 API

### 회원가입

- **Method**: `POST`
- **URL**: `/auth/signup`
- **HTTP Status Code**: 성공 `201`, 실패 `400`
- **Request Body**:
  ```json
  {
    "아이디": "string",
    "비밀번호": "string"
  }
  ```
- **Response Body**: -

### 로그인

- **Method**: `POST`
- **URL**: `/auth/login`
- **HTTP Status Code**: 성공 `200`, 실패 `400`
- **Request Body**:
  ```json
  {
    "아이디": "string",
    "비밀번호": "string"
  }
  ```
- **Response Body**: JWT 토큰 반환

> 비밀번호는 해시 후 저장, 로그인 시 비교

---

## 개인 Todo API

> **인증 필수**: 모든 요청에 JWT 토큰 필요  
> 모든 Todo는 사용자 ID 기준으로 분리됨

### Todo 등록

- **Method**: `POST`
- **URL**: `/todos`
- **HTTP Status Code**: 성공 `201`, 실패 `400`
- **Request Body**:
  ```json
  {
    "contents": "todo 내용"
  }
  ```
- **Response Body**: -

### Todo 조회

- **Method**: `GET`
- **URL**: `/todos`
- **HTTP Status Code**: 성공 `200`, 실패 `400`
- **Request Body**: -
- **Response Body**:
  ```json
  {
    "todoId": "todo 아이디",
    "contents": "todo 내용",
    "isDone": false
  }
  ```

### Todo 내용 수정

- **Method**: `PUT`
- **URL**: `/todos/:id/contents`
- **HTTP Status Code**: 성공 `200`, 실패 `400`
- **Request Body**:
  ```json
  {
    "todoId": "todo 아이디",
    "contents": "내용"
  }
  ```
- **Response Body**: -

### Todo 상태 변경

- **Method**: `PUT`
- **URL**: `/todos/:id/done`
- **HTTP Status Code**: 성공 `200`, 실패 `400`
- **Request Body**: -
- **Response Body**: -

### Todo 삭제

- **Method**: `DELETE`
- **URL**: `/todos/:id`
- **HTTP Status Code**: 성공 `200`, 실패 `400`
- **Request Body**:
  ```json
  {
    "todoId": "todo 아이디"
  }
  ```
- **Response Body**: -

---

## 팀 API

### 팀 만들기

- **Method**: `POST`
- **URL**: `/teams`
- **HTTP Status Code**: 성공 `201`, 실패 `400`
- **Request Body**:
  ```json
  {
    "teamName": "팀이름"
  }
  ```
- **Response Body**: -

### 팀 조회하기

- **Method**: `GET`
- **URL**: `/teams`
- **HTTP Status Code**: 성공 `200`, 실패 `400`
- **Request Body**: -
- **Response Body**: 팀별 name

### 팀원 조회

- **Method**: `GET`
- **URL**: `/teams/:id`
- **HTTP Status Code**: 성공 `200`, 실패 `400`
- **Request Body**: -
- **Response Body**: 팀원 목록

### 초대하기

- **Method**: `PUT`
- **URL**: `/teams/:teamId/invite`
- **HTTP Status Code**: 성공 `200`, 실패 `400`
- **Request Body**:
  ```json
  {
    "userId": "초대할 id"
  }
  ```
- **Response Body**: -

### 팀 삭제하기

- **Method**: `DELETE`
- **URL**: `/teams/:id`
- **HTTP Status Code**: 성공 `200`, 실패 `400`
- **Request Body**: -
- **Response Body**: -

### 팀원 삭제하기

- **Method**: `DELETE`
- **URL**: `/teams/:teamId/members/:userId`
- **HTTP Status Code**: 성공 `200`, 실패 `400`
- **Request Body**:
  ```json
  {
    "teamId": "팀 아이디",
    "userId": "팀원 아이디"
  }
  ```
- **Response Body**: -

> **권한**: 팀 생성자가 관리자가 되며, 초대/강퇴/삭제는 관리자만 가능

---

## 팀 Todo API

> **팀 멤버십 필수**: 팀에 속한 사용자만 접근 가능

### 팀 Todo 등록

- **Method**: `POST`
- **URL**: `/teams/:teamId/todos`
- **HTTP Status Code**: 성공 `201`, 실패 `400`
- **Request Body**:
  ```json
  {
    "contents": "todo 내용"
  }
  ```
- **Response Body**: -

### 팀 Todo 조회

- **Method**: `GET`
- **URL**: `/teams/:teamId/todos`
- **HTTP Status Code**: 성공 `200`, 실패 `400`
- **Request Body**: -
- **Response Body**:
  ```json
  {
    "teamId": "team 아이디",
    "todoId": "todo 아이디",
    "contents": "todo 내용",
    "isDone": false
  }
  ```

### 팀 Todo 내용 수정

- **Method**: `PUT`
- **URL**: `/teams/:teamId/todos/:todoId/contents`
- **HTTP Status Code**: 성공 `200`, 실패 `400`
- **Request Body**:
  ```json
  {
    "todoId": "todo 아이디",
    "contents": "내용"
  }
  ```
- **Response Body**: -

### 팀 Todo 상태 변경

- **Method**: `PUT`
- **URL**: `/teams/:teamId/todos/:todoId/done`
- **HTTP Status Code**: 성공 `200`, 실패 `400`
- **Request Body**: -
- **Response Body**: -

### 팀 Todo 삭제

- **Method**: `DELETE`
- **URL**: `/teams/:teamId/todos/:todoId`
- **HTTP Status Code**: 성공 `200`, 실패 `400`
- **Request Body**:
  ```json
  {
    "todoId": "todo 아이디"
  }
  ```
- **Response Body**: -

---

## API 요약 테이블

### 인증 API

| 기능     | 메서드 | 경로           | 설명                                  |
| -------- | ------ | -------------- | ------------------------------------- |
| 회원가입 | `POST` | `/auth/signup` | ID + 비밀번호로 회원 가입             |
| 로그인   | `POST` | `/auth/login`  | ID + 비밀번호로 로그인, JWT 토큰 반환 |

### 개인 Todo API

| 기능      | 메서드   | 경로                  | 설명                       |
| --------- | -------- | --------------------- | -------------------------- |
| 목록 조회 | `GET`    | `/todos`              | 본인의 개인 Todo 목록 조회 |
| 등록      | `POST`   | `/todos`              | 본인의 Todo 등록           |
| 내용 수정 | `PUT`    | `/todos/:id/contents` | `contents`만 수정          |
| 상태 수정 | `PUT`    | `/todos/:id/done`     | `isDone`만 수정            |
| 삭제      | `DELETE` | `/todos/:id`          | 본인의 Todo 삭제           |

### 팀 API

| 기능         | 메서드   | 경로                         | 설명                                       |
| ------------ | -------- | ---------------------------- | ------------------------------------------ |
| 팀 생성      | `POST`   | `/teams`                     | 팀을 만들고 본인을 관리자+팀원으로 등록    |
| 팀 목록 조회 | `GET`    | `/teams`                     | 내가 속한 팀 목록                          |
| 팀 단일 조회 | `GET`    | `/teams/:id`                 | 특정 팀 정보 + 팀원 ID 목록                |
| 팀원 초대    | `PUT`    | `/teams/:id/invite`          | 유저 ID를 입력해 팀에 초대 (관리자만 가능) |
| 팀 삭제      | `DELETE` | `/teams/:id`                 | 해당 팀 삭제 (관리자만 가능)               |
| 팀원 강퇴    | `DELETE` | `/teams/:id/members/:userId` | 특정 팀원 강퇴 (관리자만 가능)             |

### 팀 Todo API

| 기능      | 메서드   | 경로                                    | 설명                               |
| --------- | -------- | --------------------------------------- | ---------------------------------- |
| 목록 조회 | `GET`    | `/teams/:teamId/todos`                  | 팀에 속한 사용자만 목록 조회 가능  |
| 등록      | `POST`   | `/teams/:teamId/todos`                  | 팀에 속한 사용자만 할 일 등록 가능 |
| 내용 수정 | `PUT`    | `/teams/:teamId/todos/:todoId/contents` | `contents`만 수정                  |
| 상태 수정 | `PUT`    | `/teams/:teamId/todos/:todoId/done`     | `isDone`만 수정                    |
| 삭제      | `DELETE` | `/teams/:teamId/todos/:todoId`          | 팀에 속한 사용자만 삭제 가능       |
