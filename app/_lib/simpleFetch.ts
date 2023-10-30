import { Host } from "@/_consts/Host";
import { AnyObject } from "../_types/types"
import { Response } from './apiResponse'

export const simpleFetch = {
  post(url: string, data?: AnyObject | FormData, configs?: AnyObject): Promise<Response> {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    return fetch(Host, {
      body,
      method: "POST",
      ...configs
    }).then(res => res.json())
  },

  get<T>(
    url: string,
    configs?: AnyObject
  ): Promise<Response<T>> {
    return fetch(Host,configs).then(res => res.json())
  },

  put(url: string, data?: AnyObject, configs?: AnyObject): Promise<Response> {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    return fetch(Host, {
      body,
      method: "PUT",
      ...configs
    }).then(res => res.json())
  },

  delete(url: string,configs?:AnyObject): Promise<Response> {
    return fetch(Host, {
      method: "DELETE",
      ...configs
    }).then(res => res.json())
  } 
}

export default simpleFetch