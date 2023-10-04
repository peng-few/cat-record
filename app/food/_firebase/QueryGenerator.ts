import { QueryFieldFilterConstraint, where } from "firebase/firestore"
import { FoodType } from "../_data/FoodTypes";

export class QueryGenerator {
  contraint: QueryFieldFilterConstraint[] = []
  
  isType(type?:FoodType) {
    if (!type) return this;
    this.contraint.push(where('type', '==', type))

    return this
  }
}

export default QueryGenerator