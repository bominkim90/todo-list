
## 🔧 주요 기능

- 로그인 / 회원가입 폼 구현
- 쿠키 기반 자동 로그인 유지
- 개인 및 팀 단위의 할 일 목록 관리
- 할 일 등록, 수정, 삭제 기능
- 서버 응답 기반의 데이터 재요청 및 반영
- 오류 발생 시 사용자 알림 처리

---

## 📡 API 연동 방식

- **Axios 전역 인스턴스 (`lib/axios.ts`)**
  - `baseURL` 및 `withCredentials` 기본 설정
  - 401 Unauthorized 응답 발생 시 자동으로 로그인 페이지로 리다이렉트 처리

- **기능별 API 분리 (`api/*.ts`)**
  - auth.ts → `postLogin`, `postRegister` 등
  - team.ts → `getTeamList`, `postTeam` 등
  - todos.ts → `getTodos`, `postTodo`, `putTodo`, `deleteTodo` 등

---

## 🧠 개발 시 고려 사항

- `useNavigate` 등 훅은 최상단에서 호출하도록 구조 설계
- 인증 체크 로직은 `LoginCheck` 컴포넌트로 분리하여 필요한 페이지에만 적용 가능하도록 구성

---

## ✅ 구현 요약

| 항목 | 내용 |
|------|------|
| 프레임워크 | React + Vite + TypeScript |
| 주요 라이브러리 | axios, react-router-dom |
| 상태 관리 | useState, useEffect |
| 스타일링 | 전역 CSS 기반 className 방식 |
| API 연동 | 전역 axios 인스턴스 + 기능별 API 모듈화 |
| 인증 처리 | JWT + 쿠키 + 401 인터셉터 리다이렉션 |
| 구조 설계 | 관심사 분리 (pages, components, api, util, lib) |

---

## 🛠 추후 리팩토링 예정 사항

- 상태 관리 고도화 (Context API 또는 Redux 도입 고려)
- 스타일링 개선 (Tailwind CSS, styled-components 등 적용 검토)
- 사용자 경험 향상 (로딩 스피너, 에러 바운더리 등 추가)
- 커스텀 훅 추출로 코드 중복 제거 및 재사용성 향상

---

## 📌 백엔드 연동

이 프로젝트는 백엔드 API와 연동되는 구조입니다.  
백엔드 서버는 포트 분리 방식으로 로컬에서 동시 실행되며, `VITE_API_URL` 환경변수로 URL 설정이 가능합니다.

---

## 🗂 실행 방법

```bash
# 의존성 설치
npm install

# .env 파일 설정
VITE_API_URL=http://localhost:3000

# 개발 서버 실행
npm run dev