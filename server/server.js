import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import mongoose from "mongoose"

import Logger from "./libs/logger.js"
import errorMiddleware from "./middlewares/error.middleware.js"
import routes from "./routes/index.js"
import { initializeSwagger } from "./utils/swagger.js"
import validateEnv from "./utils/validateEnv.js"

class App {
  constructor(port) {
    this.app = express()
    this.port = port

    validateEnv()

    this.initializeMiddlewares()
    this.initializeRoutes()
    this.initializeErrorHandling()

    initializeSwagger(this.app)
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
    this.app.use(routes)
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
      Logger.error("Failed to start server:", e)
      throw e
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
      Logger.info("Connected to the database")
    } catch (e) {
      Logger.error("Failed to connect to the database:", e)
      throw e
    }
  }

  async disconnectDB() {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  }
}

export default App
