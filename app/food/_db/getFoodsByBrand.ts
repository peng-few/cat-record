import { unstable_cache } from 'next/cache'
import { Collection } from "./Collection"
import QueryBuilder from './QueryBuilder';
import { Food } from '../_consts/FoodSchema';
import { type WithId } from 'mongodb';
import objectIdToString from '@/_lib/obectIdToString';

interface FoodsByBrand {
  _id: string,
  foods: WithId<Food>[]
}
export const getFoodsByBrand = unstable_cache(async (searchParams = {}) => {
  const { page = 1, pageSize = 4 } = searchParams;
  const queryBuilder = new QueryBuilder();
  queryBuilder.filterAll({...searchParams})
  const result = await Collection.paginate<FoodsByBrand[]>({
    page,
    pageSize,
    pipeline: [{
      $match: queryBuilder.filter
    }, {
      $group: {
        _id: '$brand',
        foods: {
          $push: "$$ROOT"
        },
      }
    }]
  });

  const foodsWithStringId = result.data?.map(brand => ({
    ...brand,
    foods: brand.foods.map(objectIdToString)
  }))

  return {
    ...result,
    data: foodsWithStringId
  }
}, undefined,
  { tags: ['foods'] }
)