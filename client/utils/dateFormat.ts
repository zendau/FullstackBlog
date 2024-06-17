export default function dateFormat(date: string) {
  const formateDate = new Date(date)

  return new Intl.DateTimeFormat("ru", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(formateDate)
}
