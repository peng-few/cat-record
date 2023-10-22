import { toDecimalPlace } from "@/_lib";

export interface ClcaluteCarbohydrateProps{
  protein: number;
  fat: number;
  fiber: number;
  ash: number;
  water: number;
}

// 碳水化合物 ＝100%-蛋白質%-脂肪%-纖維%-水分%-灰分%
export const calcaluteCarbohydrate = (items: ClcaluteCarbohydrateProps) => {
  return toDecimalPlace(100 - (Object.values(items) as number[]).reduce((accu,num)=> accu+num,0),2)
}

export default calcaluteCarbohydrate;