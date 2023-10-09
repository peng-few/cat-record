import { AnyObject } from "../_types/types";

export const getObjValueFromKey = <T extends AnyObject>(obj: T) => (
  values?: string | string[],
  space: string = ','
) => {
  if (!values) return '';

  if (typeof values === 'string' ) return obj[values]
  
  return values.map(value => obj[value]).filter(value => value).join(space)
}

export default getObjValueFromKey