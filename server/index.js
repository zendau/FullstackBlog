import App from "./server.js"

const PORT = process.env.PORT || 3000
const app = new App(PORT)
app.listen()
