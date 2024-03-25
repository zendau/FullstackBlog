import Logger from "./libs/logger.js"
import App from "./server.js"

const PORT = process.env.PORT || 3000

try {
  const app = new App(PORT)
  app.listen()
} catch (e) {
  Logger.error(e)
}
