export const CONFIRM_CODE = {
  SUBJECT: "Confirm code",
  HTML: (code) => `<p>Your confirm code - ${code}</p>`,
}

export const NEW_PASSWORD = {
  SUBJECT: "Reseted password",
  HTML: (password) => `<p>Your new password - ${password}</p>`,
}

export const RESPONSE_MESSAGE = {
  CONFIRM_CODE: "Confirm code was resend is your email",
  RESET_PASSWORD: (email) => `New password was send to ${email}`,
}
