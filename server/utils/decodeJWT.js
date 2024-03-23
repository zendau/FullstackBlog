export default function decodeJWT(token) {
  const base64Url = token.split(".")[1]
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
  const decodedPayload = JSON.parse(
    Buffer.from(base64, "base64").toString("utf-8"),
  )
  return decodedPayload
}
