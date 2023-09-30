import { isPercentageUnit } from '@/_data/UnitType';
import { FieldFood } from '../_firebase';
import { EnergyType, isME } from "../_data/EnergyTypes";
import calcaluteCarbohydrate from "@/calculate/calculateCarbohydrate";
import unitConverter from "@/_lib/unitConverter";
import { Formatter, WithoutId } from "@/_lib";
import calculateME from "@/calculate/calculateME";
import { PhosUnitType, PostData } from './route';

export class FoodFormatter implements Formatter<WithoutId<FieldFood>> {
  data;

  constructor(data: Omit<WithoutId<FieldFood>,'carbonhydrate'>) {
    const { protein, fat, fiber, ash, water = 0 } = data
    this.data = {
      ...data,
      carbonhydrate: calcaluteCarbohydrate({ protein, fat, fiber, ash, water }),
    }
  }

  setPhosphorusBasePercentage(unitType?:PhosUnitType) {
    if (!unitType || !this.data.phosphorus || isPercentageUnit(unitType)) return this
  
    this.data.phosphorus= unitConverter.mgToPercentage(this.data.phosphorus,this.data.energy)
     
    return this
  }

  setEnergyBaseME(unitType?:EnergyType){
    if (!unitType || isME(unitType)) return this
  
    const { protein, fat, carbonhydrate } = this.data
    this.data.energy = calculateME({ protein, fat, carbonhydrate })
    
    return this
  }
}


export const formatPostData = ({ phosUnit, energyType, ...postData }:PostData) => {
  const foodFormatter = new FoodFormatter(postData)
  foodFormatter.setPhosphorusBasePercentage(phosUnit)
    .setEnergyBaseME(energyType)

  return foodFormatter.data
}