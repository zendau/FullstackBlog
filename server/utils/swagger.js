import swaggerJsDoc from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "A simple Express Blog API",
    },
  },
  apis: ["../routes/*.js", "../models/*.js", "../dtos/*.js"],
}

export const initializeSwagger = (app) => {
  const specs = swaggerJsDoc(swaggerOptions)
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
}
