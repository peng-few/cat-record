import { isMgPerKalorieUnit} from '@/_consts/UnitType';
import { Food } from '../_db/schema/FoodSchema';
import { EnergyType, isME } from "../_consts/EnergyType";
import { PhosUnitType } from '../_consts/PhosUnitType';
import { FoodFormRequest } from '../_db/schema/FoodFormRequestSchema';
import calcaluteCarbohydrate from "@/calculate/calculateCarbohydrate";
import calculateME from "@/calculate/calculateME";
import unitConverter from "@/_lib/unitConverter";
import { FilterNumberType, Formatter } from "@/_types/types";
import { type OptionalId } from 'mongodb';
import uploadFile from '@/file/_db/uploadFile';
import sharp from 'sharp';
import { deleteFile } from '@/file/_db/deleteFile';

export class FoodFormatter implements Formatter<OptionalId<Food>> {
  data;
  toDryMatterBasis;

  constructor(data: Omit<OptionalId<Food>,'carbonhydrate'>) {
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

  setInDryBasis(name: FilterNumberType<Food>) {
    const value = this.data[name]
    if (typeof value !== 'number') return this

    this.data[name] = this.toDryMatterBasis(value)
    
    return this
  }

  setInMgPerKcal(name: FilterNumberType<Food>) {
    const value = this.data[name]
    if (typeof value !== 'number') return this
  
    this.data[name] = unitConverter.percentageToMg(value, this.data.energy)
    return this
  }

  async refreshImg(img?:File) {
    if (!img) return this

    const [id]= await Promise.all([
      uploadFile(img, (buffer) => {
        return sharp(buffer)
          .resize({
            width: 200,
            height: 150,
            fit: sharp.fit.cover,
          })
          .toBuffer()
      }),
      deleteFile(this.data.imgId)
    ])

    this.data.imgId = id.toHexString()
  }
}

export const formatFormRequest = async ({ phosUnit, energyType,img, ...postData }:FoodFormRequest) => {
  const foodFormatter = new FoodFormatter(postData)
  foodFormatter.setEnergyBaseME(energyType)
    .setPhosphorusBaseMgPerKcal(phosUnit)
    .setInMgPerKcal("calcium")
    .setInDryBasis("ash")
    .setInDryBasis("carbonhydrate")
    .setInDryBasis("fat")
    .setInDryBasis("protein")
    .setInDryBasis("fiber")
  
  await foodFormatter.refreshImg(img)


  return foodFormatter.data
}