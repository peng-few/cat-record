export const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
export const ACCEPTED_IMAGE = [
  { ext: 'jpg', type: 'image/jpeg' },
  { ext: 'gif', type: 'image/gif' },
  { ext: 'png', type: 'image/png' },
]

export const ACCEPTED_FILE = [...ACCEPTED_IMAGE]

export function getExtension(filename: string) {
  var parts = filename.split('.');
  return parts[parts.length - 1];
}

export function isValidImage({name,type}:File) {
  const ext = getExtension(name);
  const result = ACCEPTED_IMAGE.find((validImg) =>
    validImg.ext === ext && validImg.type === type)
  return !!result

}

export function isValidFile({name,type}: File) {
  const ext = getExtension(name);
  const result = ACCEPTED_FILE.find((validImg) =>
    validImg.ext === ext && validImg.type === type)
  return !!result
}