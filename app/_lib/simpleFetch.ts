import { AnyObject } from "../_types/types"
import { Response } from './apiResponse'
import { getHost } from "@/_lib/getHost";
const Host = getHost()+ '/'

export const simpleFetch = {
  post(url: string, data?: AnyObject | FormData, configs?: AnyObject): Promise<Response> {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    return fetch(Host+url, {
      body,
      method: "POST",
      ...configs
    }).then(res => res.json())
  },

  get<T>(
    url: string,
    configs?: AnyObject
  ): Promise<Response<T>> {
    return fetch(Host+url,configs).then(res => res.json())
  },

  put(url: string, data?: AnyObject, configs?: AnyObject): Promise<Response> {
    const body = data instanceof FormData ? data : JSON.stringify(data);
    return fetch(Host+url, {
      body,
      method: "PUT",
      ...configs
    }).then(res => res.json())
  },

  delete(url: string,configs?:AnyObject): Promise<Response> {
    return fetch(Host+url, {
      method: "DELETE",
      ...configs
    }).then(res => res.json())
  } 
}

export default simpleFetch