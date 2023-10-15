import { toDecimalPlace } from "@/_lib";
import { Formatter } from "@/_types/types";
import { Record } from "../_db/schema/RecordSchema";
import getFood from "@/food/_db/getFood";
import { Food } from "@/food/_consts/FoodSchema";
import dayjs from "dayjs";
import { type WithId } from 'mongodb'
import { RecordFormRequest } from "../_db/schema/RecordFormRequestSchema";

class RecordFormatter implements Formatter<Record> {
  food: WithId<Food> | null;
  data;
  constructor(data: RecordFormRequest) {
    this.data = {
      energy: 0,
      totalWater: 0,
      ...data,
    }
    this.food = null;
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

export const formatFormRequest = async (data:RecordFormRequest) => {
  const recordFormatter = new RecordFormatter(data)
    
  await recordFormatter.getFood()
  recordFormatter.setEnergy().setTotalWater()

  return recordFormatter.data
}