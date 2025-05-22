import "express";

declare global {
  namespace Express {
    interface User {
      id: string;
      [key: string]: any;
    }

    interface Request {
      user?: User;
    }
  }
}

export {};

// JWT 내부의 Payload를 사용하기 위해서 타입 보강 필요요
