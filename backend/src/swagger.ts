import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "Todo & Team API documentation using Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000", // .env 기반으로 추후 교체 가능 여부
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // 라우터 파일에 Swagger 주석 작성하면 여기서 읽는다.
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
});
