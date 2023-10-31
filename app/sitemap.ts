import { getBrandPairs } from "./(feature)/brand/_db/getBrandPairs";
import { SearchParam, SearchParamType } from "./(feature)/food/_consts/SearchParam";
import { getHost } from "@/_lib/getHost";
const Host = getHost()

const lastModified = new Date().toISOString()
type FoodUrlParams = Partial<Record<SearchParamType, string>>
type Route = {
  url: string,
  lastModified: string
}
const getFoodRoutes = async () => {
  const brands = await getBrandPairs();
  const foodParams = { ...SearchParam, brand: brands } as const 
  const foodParamsKeys = Object.keys(foodParams) as SearchParamType[];
  const foodRoutes: Route[] = [];

  const fraction = (i: number, params = {},isSub=false) => {
    const key = foodParamsKeys[i]
    Object.keys(foodParams[key]).forEach(value => {
      if (!isSub) {
        foodRoutes.push({
          url: `${Host}/food?${key}=${value}`,
          lastModified
        })
      } else {
        const nextParams: FoodUrlParams = { ...params, [key]: value }
        const qs = new URLSearchParams(nextParams)
        foodRoutes.push({
          url: `${Host}/food?${qs.toString().replaceAll('&','&amp;')}`,
          lastModified
        })
      }

      if (foodParamsKeys[i + 1]) {
        if (isSub) {
          fraction(i + 1, {...params},true)
        } else {
          fraction(i + 1, {[key]: value},true)
        }
        
      }
    })
  }
  foodParamsKeys.forEach((key,index) => fraction(index)) 
  
  return foodRoutes
}
export default async function sitemap() {
  const foodRoutes = await getFoodRoutes()
  console.log(foodRoutes)
  const routes = ["", "/brand",'/food'].map((route) => ({
    url: `${Host}${route}`,
    lastModified,
  }));
 
  return [...routes,...foodRoutes];
}