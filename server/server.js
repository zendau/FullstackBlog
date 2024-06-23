import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import swaggerJsDoc from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"

import Logger from "./libs/logger.js"
import errorMiddleware from "./middlewares/error.middleware.js"
import adminRoute from "./routes/admin.route.js"
import commentRoute from "./routes/comment.route.js"
import fileRoute from "./routes/file.route.js"
import postRoute from "./routes/post.route.js"
import reactionRoute from "./routes/reaction.route.js"
import userRoute from "./routes/user.route.js"
import validateEnv from "./utils/validateEnv.js"

class App {
  constructor(port) {
    this.app = express()
    this.port = port

    validateEnv()

    this.initializeSwagger()
    this.initializeMiddlewares()
    this.initializeRoutes()
    this.initializeErrorHandling()
  }

  initializeSwagger() {
    const options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Blog API",
          version: "1.0.0",
          description: "A simple Express Blog API",
        },
      },
      apis: ["./routes/*.js", "./models/*.js", "./dtos/*.js"],
    }

    const specs = swaggerJsDoc(options)
    this.app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
  }

  initializeMiddlewares() {
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())

    this.app.use(cookieParser())

    this.app.use(
      cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
      }),
    )

    this.app.use("/image", express.static(process.env.FILE_FOULDER))
  }

  initializeRoutes() {
    this.app.use("/user", userRoute)
    this.app.use("/post", postRoute)
    this.app.use("/file", fileRoute)
    this.app.use("/comment", commentRoute)
    this.app.use("/admin", adminRoute)
    this.app.use("/reaction", reactionRoute)
  }

  initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }

  async listen() {
    try {
      await this.connectDB()
      this.app.listen(this.port, () => {
        Logger.info(`App listening on the port http://localhost:${this.port}`)
      })
    } catch (e) {
      Logger.error(e)
      throw new Error(e)
    }
    return this.app
  }

  async connectDB() {
    try {
      await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
    } catch (e) {
      Logger.error(e)
      throw new Error(e)
    }
  }

  async disconnectDB() {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  }
}

export default App
