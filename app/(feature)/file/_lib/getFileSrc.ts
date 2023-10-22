import { MongoId } from "@/_types"

export const getFileSrc =(id: string | MongoId) => {
  if (typeof id !== 'string') id = id.toHexString();
  return '/file/'+ id
}
export default getFileSrc