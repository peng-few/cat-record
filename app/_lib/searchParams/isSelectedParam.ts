import { PageProps } from "../../_types/types";

export const isSelectedParam = (
  param: string,
  selectedParams: PageProps['searchParams'][string]) => {

  if (!selectedParams) return false;
  if (typeof selectedParams === 'string') {
    return param === selectedParams
  }
  return selectedParams.includes(param)
}

export default isSelectedParam;