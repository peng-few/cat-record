/**
 * @jest-environment jsdom
 */
import { toDecimalPlace } from '..'
 
describe('toDecimalPlace', () => {
  it('calculate number to show at most 2 decimal place', () => {
    expect(toDecimalPlace(250.1435221,2)).toBe(250.14)
  })
  it('calculate number to show at most 3 decimal place', () => {
    expect(toDecimalPlace(0.123222223,3)).toBe(0.123)
  })
})