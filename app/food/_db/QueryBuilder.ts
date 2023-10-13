import { type WithId, type Filter } from "mongodb"
import { FoodType } from "../_consts/FoodType"
import { Food } from "../_consts/FoodSchema"

export class QueryBuilder {
  filter: Filter<WithId<Food>> = {}

  isType(type?: FoodType) {
    if (!type) return this
    this.filter.type = type
    return this
  }

  isBrand(brand?: string) {
    if (!brand) return this
    this.filter.brand = brand
    return this
  }

  isLowProtein(value: string) {
    if (value !== "low") return this
    this.filter.protein = { $lt: 30 }
    return this
  }

  isHighProtein(value: string) {
    if (value !== "high") return this
    this.filter.protein = { $gt: 48 }
    return this
  }

  isLowPhosphorus(value: string) {
    if (value !== "low") return this
    this.filter.phosphorus = { $lt: 150 }
    return this
  }

  isLowCarbon(value: string) {
    if (value !== "low") return this
    this.filter.carbonhydrate = { $lt: 18 }
    return this
  }

  notFishMeat(value: string) {
    if (value !== "0") return this
    this.filter.name = { $not: { $regex: "魚" } }
    return this
  }

  filterAll({
    type,
    brand,
    phosphorus = "",
    protein = "",
    carbon = "",
    fishmeat = "",
  }: {
    type?: FoodType
    brand?: string
    phosphorus?: string
    carbon?: string
    fishmeat?: string
    protein?: string
  }) {
    this.isType(type)
      .isBrand(brand)
      .isLowPhosphorus(phosphorus)
      .isHighProtein(protein)
      .isLowProtein(protein)
      .isLowCarbon(carbon)
      .notFishMeat(fishmeat)

    return this
  }
}

export default QueryBuilder
