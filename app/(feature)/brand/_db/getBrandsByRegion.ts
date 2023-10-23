import { unstable_cache } from "next/cache";
import { Collection } from "./Collection";
import { type WithId } from "mongodb";
import { Brand } from "./schema/BrandSchema"
import objectIdToString from "@/_lib/obectIdToString";
import { RegionType } from "../_consts/RegionType";

export interface BrandsByRegion{
  _id: RegionType,
  brands: WithId<Brand>[]
}
export const getBrandsByRegion = unstable_cache(async () => {
  const regionList = await Collection.getDatas<BrandsByRegion>([
     {
       $group: {
         _id: '$region',
         brands: {
           $push: "$$ROOT"
         },
       }
     }, {
       $sort: { _id: 1 }
     }
  ])
  const regionListWithStringId = regionList.map((region) => ({
    ...region,
    brands: region.brands.map(objectIdToString)
  }))
  return regionListWithStringId
 },undefined,{ tags: ['brands'] }) 