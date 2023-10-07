import { isMgPerKalorieUnit} from '@/_data/UnitType';
import { FieldFood } from '../_firebase';
import { EnergyType, isME } from "../_data/EnergyTypes";
import calcaluteCarbohydrate from "@/calculate/calculateCarbohydrate";
import unitConverter from "@/_lib/unitConverter";
import { FilterNumberType, Formatter, WithoutId } from "@/_lib";
import calculateME from "@/calculate/calculateME";
import { PhosUnitType, PostData } from './route';

export class FoodFormatter implements Formatter<WithoutId<FieldFood>> {
  data;
  toDryMatterBasis;

  constructor(data: Omit<WithoutId<FieldFood>,'carbonhydrate'>) {
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

  setInDryBasis(name: FilterNumberType<FieldFood>) {
    this.data[name] = this.toDryMatterBasis(this.data[name])
    
    return this
  }

  setInMgPerKcal(name: FilterNumberType<FieldFood>) {
    this.data[name] = unitConverter.percentageToMg(this.data[name], this.data.energy)
    return this
  }
}

export const formatPostData = ({ phosUnit, energyType, ...postData }:PostData) => {
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