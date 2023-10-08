import { isMgPerKalorieUnit} from '@/_data/UnitType';
import { FoodEntity } from '../_consts/FoodEntitySchema';
import { EnergyType, isME } from "../_consts/EnergyType";
import { PhosUnitType } from '../_consts/PhosUnitType';
import { FoodFormRequest } from '../_consts/FoodFormRequestSchema';
import calcaluteCarbohydrate from "@/calculate/calculateCarbohydrate";
import calculateME from "@/calculate/calculateME";
import unitConverter from "@/_lib/unitConverter";
import { FilterNumberType, Formatter } from "@/_lib";
import { OptionalId } from 'mongodb';

export class FoodFormatter implements Formatter<OptionalId<FoodEntity>> {
  data;
  toDryMatterBasis;

  constructor(data: Omit<OptionalId<FoodEntity>,'carbonhydrate'>) {
    const { protein, fat, fiber, ash, water = 0 } = data
    this.data = {
      ...data,
      carbonhydrate: calcaluteCarbohydrate({ protein, fat, fiber, ash, water }),
    }
    this.toDryMatterBasis = unitConverter.toDryMatterBasis(water)
  }

  setPhosphorusBaseMgPerKcal(unitType?:PhosUnitType) {
    if (!unitType || !this.data.phosphorus || isMgPerKalorieUnit(unitType)) return this
     
    return this.setInMgPerKcal('phosphorus')
  }

  setEnergyBaseME(unitType?:EnergyType){
    if (!unitType || isME(unitType)) return this
  
    const { protein, fat, carbonhydrate } = this.data
    this.data.energy = calculateME({ protein, fat, carbonhydrate })
    
    return this
  }

  setInDryBasis(name: FilterNumberType<FoodEntity>) {
    this.data[name] = this.toDryMatterBasis(this.data[name])
    
    return this
  }

  setInMgPerKcal(name: FilterNumberType<FoodEntity>) {
    this.data[name] = unitConverter.percentageToMg(this.data[name], this.data.energy)
    return this
  }
}

export const formatFormRequest = ({ phosUnit, energyType, ...postData }:FoodFormRequest) => {
  const foodFormatter = new FoodFormatter(postData)
  foodFormatter.setPhosphorusBaseMgPerKcal(phosUnit)
    .setInMgPerKcal("calcium")
    .setEnergyBaseME(energyType)
    .setInDryBasis("ash")
    .setInDryBasis("carbonhydrate")
    .setInDryBasis("fat")
    .setInDryBasis("protein")
    .setInDryBasis("fiber")

  return foodFormatter.data
}