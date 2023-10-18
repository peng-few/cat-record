import { headers } from 'next/headers';

export const getUrlOnServer = () =>{
  const headersList = headers();
  const url = headersList.get('referer') || "";
  return url
}

export default getUrlOnServer