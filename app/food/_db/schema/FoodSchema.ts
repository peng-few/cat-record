import { z } from "zod";
import { zIsPositiveNumber, zToNumber, zToNumberOptional,zMongoId  } from '@/_lib/zUtil'
import { FoodType } from "../../_consts/FoodType";

export const FoodSchema = z.object({
  type: FoodType,
  energy: zToNumber('請填入熱量').pipe(zIsPositiveNumber()),
  brand: z.string({ required_error: '請選擇品牌' }),
  name: z.string().min(1,{message: '請填入品名'}),
  protein: zToNumber('請輸入蛋白質').pipe(zIsPositiveNumber()),
  fat: zToNumber('請輸入脂肪').pipe(zIsPositiveNumber()),
  fiber: zToNumber('請輸入纖維').pipe(zIsPositiveNumber()),
  ash: zToNumber('請輸入灰分').pipe(zIsPositiveNumber()),
  carbonhydrate: zToNumber('請輸入碳水化合物').pipe(zIsPositiveNumber()),
  water: zToNumberOptional(),
  phosphorus: zToNumberOptional(),
  calcium: zToNumberOptional(),
  imgId: zMongoId.optional()
});
export type Food = z.infer<typeof FoodSchema>; 