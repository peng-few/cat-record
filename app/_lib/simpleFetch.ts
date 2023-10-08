import { AnyObject } from "."
import { Response } from './apiResponse'


const baseURL = process.env.BASE_URL || ''

export const simpleFetch = {
  post(url:string,data?:AnyObject,configs?:AnyObject): Promise<Response> {
    return fetch(baseURL+url, {
      body: JSON.stringify(data),
      method: "POST",
      ...configs
    }).then(res => res.json())
  },

  get<T>(
    url: string,
    configs?: AnyObject
  ): Promise<Response<T>> {
    return fetch(baseURL+url,configs).then(res => res.json())
  },

  put(url:string,data?:AnyObject,configs?:AnyObject): Promise<Response> {
    return fetch(baseURL+url, {
      body: JSON.stringify(data),
      method: "PUT",
      ...configs
    }).then(res => res.json())
  },

  delete(url: string,configs?:AnyObject): Promise<Response> {
    return fetch(baseURL+url, {
      method: "DELETE",
      ...configs
    }).then(res => res.json())
  } 
}

export default simpleFetch