/**
 * @jest-environment jsdom
 */
import unitConverter from '../unitConverter'
 
describe('unitConverter', () => {
  it('convert mg/kcal to Percentage correctly', () => {
    expect(unitConverter.mgToPercentage(125,111.7)).toBe(0.14)
  })

  it('convert Percentage to mg/kcal correctly', () => {
    expect(unitConverter.percentageToMg(0.14,111.7)).toBe(125.34)
  })

  it('convert value to percentage correctly', () => {
    expect(unitConverter.toPercentage(12.25)).toBe(0.12)
  })
})