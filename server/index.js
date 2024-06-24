import Logger from "./libs/logger.js"
import App from "./server.js"

const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    const app = new App(PORT)
    await app.listen()
  } catch (e) {
    Logger.error(e)
  }
}

startServer()
