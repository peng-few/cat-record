import { PageProps } from "../type";

export const toUrlSearchParams = (searchParams: PageProps['searchParams']): URLSearchParams => {
  const paramKeys = Object.keys(searchParams)
  const urlParamArray= paramKeys.reduce((accu,key) => {
    const value = searchParams[key]
    if (typeof value === 'undefined') return accu
    if (value instanceof Array) {
      return [
        ...accu,
        ...(value.map(v => [key, v]))
      ]
    }
    return [
      ...accu,
      [key, value]
    ]
  }, [] as string[][])

  return new URLSearchParams(urlParamArray)
}

export default toUrlSearchParams