export function getMediaSrc(file: File) {
  const src = URL.createObjectURL(file)
  return src
}
