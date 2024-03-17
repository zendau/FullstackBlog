import { cleanEnv, num, port, str } from "envalid"

export default function validateEnv() {
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
