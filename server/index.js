require('dotenv').config()

const express = require("express")
const app = express()

const cookieParser = require('cookie-parser')
const cors = require('cors')

const mongoose = require('mongoose')

const userRoute = require("./routes/user.route")

const errorMiddleware = require("./middlewares/error.middleware")

const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cookieParser())

app.use(cors())

app.use("/user", userRoute)

app.use(errorMiddleware)

async function start() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        app.listen(PORT, () => {
            console.log(`server started on http://localhost:${PORT}`)
        })

    } catch (e) {
        console.log(e.message)
    }
}

start()