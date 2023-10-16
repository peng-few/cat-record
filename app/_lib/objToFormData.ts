import { AnyObject } from "@/_types"

export const objToFormData = (obj:AnyObject) => {
  const formData = new FormData();
  Object.keys(obj).forEach(key => {
    const value = obj[key]
    if (value instanceof Array) {
      value.forEach(arrValue => formData.append(key,arrValue))
    } else if(typeof value !== 'undefined'){
      formData.append(key,obj[key])
    }
  });

  return formData
}

export default objToFormData