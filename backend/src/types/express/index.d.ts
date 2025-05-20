import "express";

declare module "express" {
  interface Request {
    user?: {
      id: string;
    };
  }
}

// JWT 내부의 Payload를 사용하기 위해서 타입 보강 필요요
