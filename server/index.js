require('dotenv').config()

const express = require("express")
const app = express()
const path = require('path')

const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")

const cookieParser = require('cookie-parser')
const cors = require('cors')

const mongoose = require('mongoose')

const userRoute = require("./routes/user.route")
const postRoute = require("./routes/post.route")
const fileRoute = require("./routes/file.route")

const errorMiddleware = require("./middlewares/error.middleware")

const PORT = process.env.PORT || 3000

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "A simple Express Blog API",
    }
  },
  apis: ["./routes/*.js", "./models/*.js", "./dtos/*.js"],
}

const specs = swaggerJsDoc(options)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cookieParser())

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))

app.use("/user", userRoute)
app.use("/post", postRoute)
app.use("/file", fileRoute)

app.use(errorMiddleware)
app.use("/image", express.static(path.join(__dirname, process.env.FILE_FOULDER)))

async function start() {
  try {
    await mongoose
      .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connected to MongoDB server"))
      .catch((error) => console.log(error))

    app.listen(PORT, () => {
      console.log(`server started on http://localhost:${PORT}`)
    })
  } catch (e) {
    console.error(e.message)
  }
}

start()