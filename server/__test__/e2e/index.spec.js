import request from "supertest"

import App from "../../server"
import decodeJWT from "../../utils/decodeJWT"
import registerUser from "./fixtures/register-user"

describe("user/register endpoint", () => {
  let initApp

  const PORT = process.env.PORT || 3000
  const app = new App(PORT)
  beforeAll(async () => {
    initApp = await app.listen()
  })

  it("success 200", async () => {
    const res = await request(initApp).post("/user/register").send(registerUser)

    expect(res.status).toBe(200)

    const { accessToken } = res.body

    console.log(accessToken)

    const decodedAccessToken = decodeJWT(accessToken)

    expect(decodedAccessToken.payload.email).toBe(registerUser.email)
  })

  it("success 200 - copy data", async () => {
    const res = await request(initApp).post("/user/register").send(registerUser)

    expect(res.status).toBe(400)
    expect(res.body.message).toBe(
      `user with email - ${registerUser.email} is already registered`,
    )
  })

  it("empty data 400", async () => {
    const res = await request(initApp).post("/user/register").send()

    expect(res.status).toBe(400)
  })

  afterAll(async () => {
    await app.disconnectDB()
  })
})
