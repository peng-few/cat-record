import { QueryFieldFilterConstraint, where } from "firebase/firestore"
import { FoodType } from "../_data/FoodTypes";

export class QueryGenerator {
  contraint: QueryFieldFilterConstraint[] = []

  isType(type?:FoodType) {
    if (!type) return this;
    this.contraint.push(where('type', '==', type))
    return this
  }

  isLowProtein(value:string) {
    if (value !== 'low') return this;
    this.contraint.push(where('protein', '<=', 30))
    return this
  }

  isHighProtein(value:string) {
    if (value !== 'high') return this;
    this.contraint.push(where('protein', '>=', 45))
    return this
  }

  isLowPhosphorus(value: string) {
    if (value !== 'low') return this
    this.contraint.push(where('phosphorus', '<=', 150))
    return this
  }

  isLowCarbon(value: string) {
    if (value !== 'low') return this
    this.contraint.push(where('carbon', '<=', 18))
    return this
  }

  notFishMeat(value: string) {
    if (value !== '0') return this
    this.contraint.push(where('name', '>=', '魚'), where('name', '<=', '魚z'))
    return this
  }

}

export default QueryGenerator