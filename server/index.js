require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

const express = require("express")
const path = require("path")

const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

const cookieParser = require("cookie-parser")
const cors = require("cors")

const mongoose = require("mongoose")

const { cleanEnv, str, port, num } = require("envalid")

const userRoute = require("./routes/user.route")
const postRoute = require("./routes/post.route")
const fileRoute = require("./routes/file.route")
const commentRoute = require("./routes/comment.route")
const adminRoute = require("./routes/admin.route")

const errorMiddleware = require("./middlewares/error.middleware")

class App {
  constructor(port) {
    this.app = express()
    this.port = port

    this.validateEnv()

    this.initializeMiddlewares()
    this.initializeRoutes()
    this.initializeErrorHandling()
  }

  validateEnv() {
    cleanEnv(process.env, {
      PORT: port(),
      DB_URL: str(),
      BCRYPT_SALT: num(),
      JWT_ACCESS_SECRET: str(),
      JWT_ACCESS_EXPIRES: str(),
      JWT_REFRESH_SECRET: str(),
      JWT_REFRESH_EXPIRES: str(),
      CLIENT_URL: str(),
      MAILER_HOST: str(),
      MAILER_PORT: port(),
      MAILER_USER: str(),
      MAILER_PASS: str(),
      MAILER_FROM: str(),
      FILE_FOULDER: str(),
    })
  }

  initializeSwaggerSpecs() {
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
    return specs
  }

  initializeMiddlewares() {
    this.app.use(
      "/api-docs",
      swaggerUI.serve,
      swaggerUI.setup(this.initializeSwaggerSpecs()),
    )

    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())

    this.app.use(cookieParser())

    this.app.use(
      cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
      }),
    )

    this.app.use(
      "/image",
      express.static(path.join(__dirname, process.env.FILE_FOULDER)),
    )
  }

  initializeRoutes() {
    this.app.use("/user", userRoute)
    this.app.use("/post", postRoute)
    this.app.use("/file", fileRoute)
    this.app.use("/comment", commentRoute)
    this.app.use("/admin", adminRoute)
  }

  initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }

  async listen() {
    try {
      await this.connectToTheDatabase()
      this.app.listen(this.port, () => {
        console.log(`App listening on the port http://localhost:${this.port}`)
      })
    } catch (e) {
      console.error(`Server Error: -> ${e}`)
    }
  }

  async connectToTheDatabase() {
    try {
      await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
    } catch (e) {
      console.error(`DB Error: -> ${e}`)
    }
  }
}

const PORT = process.env.PORT || 3000
const app = new App(PORT)
app.listen()
