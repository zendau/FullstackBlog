export default function (file: string) {
  const url = import.meta.env.VITE_API
  return `${url}/image/${file}`
}
