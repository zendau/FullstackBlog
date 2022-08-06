export function dateFormat(date: string) {
  const formatter = new Intl.DateTimeFormat("ru")
  const dateFormat = new Date(date)

  return formatter.format(dateFormat)
}