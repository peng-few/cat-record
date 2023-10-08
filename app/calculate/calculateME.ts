import { toDecimalPlace } from "@/_lib";

export interface calculateMEProps{
  protein: number;
  fat: number;
  carbonhydrate: number;
}

/**
 * 
 * 蛋白質每一公克可以提供3.5kcal的熱量
  *脂肪每一公克可以提供8.5kcal的熱量
  *碳水化合物每一公克可以提供3.5kcal的熱量
*/
export const calculateME = ({protein,fat,carbonhydrate}:calculateMEProps) => {
  return toDecimalPlace(protein * 3.5 + fat * 8.5 + carbonhydrate * 3.5,2)
}

export default calculateME;