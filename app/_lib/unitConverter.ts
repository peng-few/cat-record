import { toDecimalPlace } from "./toDecimalPlace";

export const unitConverter = {
  /**
   * 
   * @param value mg/kcal
   * @param energy kcal/100g
   * @returns % in weight
   */
  mgToPercentage(value: number = 0, energy: number =0) {
    return unitConverter.toPercentage(value * energy / 1000)
  },

  /**
   * 
   * @param value  % in weight
   * @param energy kcal/100g
   * @returns mg/kcal
   */
  percentageToMg(value: number = 0, energy: number = 0) {
    return toDecimalPlace(value / energy * 100000, 2)
  },

  toPercentage(value: number) {
    return toDecimalPlace(value / 100, 2)
  },

  toDryMatterBasis: (water: number) => (target: number) => {
    return toDecimalPlace(target / (100 - water) * 100, 2 )
  },

  toWetMatterBasis: (water: number = 0) => (target: number = 0) => {
    return toDecimalPlace(target / 100 * (100 - water), 2 )
  },
}

export default unitConverter;