import { Formatter, WithoutId, toDecimalPlace } from "@/_lib";
import { PostData } from "./route";
import { FieldRecord } from "../_firebase";
import getFood from "@/food/_firebase/getFood";
import { FieldFood } from "@/food/_firebase";

class RecordFormatter implements Formatter<WithoutId<FieldRecord>> {
  food?: FieldFood;
  data;
  constructor(data: PostData) {
    this.data = {
      energy: 0,
      totalWater: 0,
      ...data,
    }
    this.food = undefined;
  }

  async getFood() {
    if (typeof this.data.foodId === 'undefined') return this
    this.food = await getFood(this.data.foodId)
    return this;
  }

  setEnergy() {
    if ( !this.food || !this.data.amount) return this;
    
    this.data.energy = toDecimalPlace((this.data.amount / 100 )* this.food.energy, 2)
    return this;
  }

  setTotalWater() {
    if (!this.food || !this.data.amount) return this;
    
    this.data.totalWater = toDecimalPlace(this.data.water + this.data.amount / 100 * this.food.water,2)
    return this
  }
}

export const formatPostData = async (data:PostData) => {
  const recordFormatter = new RecordFormatter(data)
    
  await recordFormatter.getFood()
  recordFormatter.setEnergy().setTotalWater()

  return recordFormatter.data
}